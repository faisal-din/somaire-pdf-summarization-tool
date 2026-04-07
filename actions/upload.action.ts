'use server';

import { getDbConnection } from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPDFText } from '@/lib/langchain';
import { StorePdfSummaryParams, UploadResponse } from '@/types';
import { ActionResponse, ErrorResponse, SuccessResponse } from '@/types/action';
import { formatFileNameAsTitle } from '@/utils/format-fileName';
import { auth } from '@clerk/nextjs/server';

type PdfSummaryResponse = { summary: string; title: string };

export async function generatePDFSummary(
  uploadResponse: UploadResponse
): Promise<ActionResponse<PdfSummaryResponse>> {
  if (!uploadResponse || uploadResponse.length === 0) {
    return ErrorResponse('No uploaded files provided.');
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    console.error('PDF URL is missing in the upload response:', uploadResponse);

    return ErrorResponse('PDF URL is missing.');
  }

  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);
    // console.log('pdf text: ', pdfText);

    let summary;

    try {
      summary = await generateSummaryFromGemini(pdfText);
      // console.log('Generated summary from gemini: ', summary);

      if (!summary) {
        throw new Error('Received empty summary from Gemini.');
      }
    } catch (error) {
      console.error('Error generating summary with Gemini:', error);
      return ErrorResponse(
        error instanceof Error
          ? error.message
          : 'Failed to generate summary with Gemini.'
      );
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return SuccessResponse(
      {
        summary,
        title: formattedFileName,
      },
      'PDF processed successfully'
    );
  } catch (error) {
    console.error('Error generating PDF summary:', error);
    return ErrorResponse('Failed to generate PDF summary.');
  }
}

export async function savedPdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: StorePdfSummaryParams) {
  try {
    const sql = await getDbConnection();

    await sql`
     INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
      )
  VALUES (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
    );
    `;
  } catch (error) {
    console.error('Error saving PDF summary:', error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: StorePdfSummaryParams) {
  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return ErrorResponse('User not found.');
    }

    savedSummary = await savedPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return ErrorResponse('Failed to save PDF summary.');
    }

    return SuccessResponse(savedSummary, 'PDF summary stored successfully');
  } catch (error) {
    console.error('Error storing PDF summary:', error);

    return ErrorResponse(
      error instanceof Error ? error.message : 'Error storing PDF summary.'
    );
  }
}
