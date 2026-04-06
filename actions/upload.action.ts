'use server';

import { generateSummaryFromGemini } from '@/lib/geminiai';
import { fetchAndExtractPDFText } from '@/lib/langchain';
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from '@/types/action';

type UploadResponse = {
  serverData: {
    userId: string;
    file: { url: string; name: string };
  };
}[];

export async function generatePDFSummary(
  uploadResponse: UploadResponse
): Promise<ActionResult<string>> {
  if (!uploadResponse || uploadResponse.length === 0) {
    return createErrorResult('No uploaded files provided.');
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    console.error('PDF URL is missing in the upload response:', uploadResponse);

    return createErrorResult('PDF URL is missing.');
  }

  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);
    console.log('pdf text: ', pdfText);

    let summary;

    try {
      summary = await generateSummaryFromGemini(pdfText);
      // console.log('Generated summary from gemini: ', summary);

      if (!summary) {
        throw new Error('Received empty summary from Gemini.');
      }
    } catch (error) {
      console.error('Error generating summary with Gemini:', error);
      return createErrorResult('Failed to generate summary with Gemini.');
    }

    return createSuccessResult(summary, 'PDF processed successfully');
  } catch (error) {
    console.error('Error generating PDF summary:', error);
    return createErrorResult('Failed to generate PDF summary.');
  }
}
