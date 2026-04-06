'use server';

import { fetchAndExtractPDFText } from '@/lib/langchain';

type UploadResponse = {
  serverData: {
    userId: string;
    file: { url: string; name: string };
  };
}[];

type ActionResult<T> = { success: boolean; message: string; data: T | null };

export async function generatePDFSummary(
  uploadResponse: UploadResponse
): Promise<ActionResult<string>> {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: 'File upload failed.',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    console.error('PDF URL is missing in the upload response:', uploadResponse);

    return {
      success: false,
      message: 'PDF URL is missing.',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);

    console.log('pdf text: ', pdfText);

    return {
      success: true,
      message: 'PDF processed successfully',
      data: pdfText,
    };
  } catch (error) {
    console.error('Error generating PDF summary:', error);
    return {
      success: false,
      message: 'Failed to generate PDF summary.',
      data: null,
    };
  }
}
