'use server';

import { getDbConnection } from '@/lib/db';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPDFText } from '@/lib/langchain';
import { SavePdfSummaryProps, UploadResponseProps } from '@/types';
import { ActionResponse, ErrorResponse, SuccessResponse } from '@/types/action';
import { formatFileNameAsTitle } from '@/utils/format-fileName';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

type PdfSummaryResponse = { summary: string; title: string };

// Generate summary from uploaded PDF
export async function generatePdfSummaryAction(
  uploadResponse: UploadResponseProps
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
    return ErrorResponse('Invalid upload response.');
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

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      return ErrorResponse(
        errorMessage.includes('503') || errorMessage.includes('UNAVAILABLE')
          ? 'Gemini is experiencing high demand. Please try again in a moment.'
          : errorMessage.includes('429') ||
              errorMessage.includes('RATE_LIMIT_EXCEEDED')
            ? 'Rate limit exceeded. Please wait a moment before trying again.'
            : `Failed to generate summary with Gemini, please try again.`
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
    console.error('PDF summary generation error:', error);
    return ErrorResponse('Failed to generate PDF summary.');
  }
}

// separate function to handle database insertion of the summary, called from the main action to keep concerns separated
// Insert PDF summary into database
async function insertPdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryProps) {
  try {
    const sql = await getDbConnection();

    const [savedSummary] = await sql`
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
    ) RETURNING id, summary_text;
    `;

    return savedSummary;
  } catch (error) {
    console.error('Error saving PDF summary:', error);
    throw error;
  }
}

// Main action to save the PDF summary, which calls the insert function and handles cache revalidation
export async function savePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: SavePdfSummaryProps) {
  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return ErrorResponse('User not found.');
    }

    savedSummary = await insertPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return ErrorResponse('Failed to save PDF summary. Please try again.');
    }
  } catch (error) {
    console.error('Error saving PDF summary:', error);

    return ErrorResponse('Error saving PDF summary. Please try again.');
  }

  // Revalidate the cache for the user's summaries page to reflect the new summary
  revalidatePath(`/summaries/${savedSummary.id}`);

  return SuccessResponse(
    { id: savedSummary.id },
    'PDF summary saved successfully'
  );
}
