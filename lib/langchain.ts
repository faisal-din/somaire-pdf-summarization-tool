import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPDFText(pdfUrl: string) {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));

    const documents = await loader.load();

    // Extract text content from the loaded documents
    const extractedText = documents.map((doc) => doc.pageContent).join('\n');
    return extractedText;
  } catch (error) {
    console.error('Error fetching or extracting PDF text:', error);
    throw new Error('Failed to fetch or extract PDF text.');
  }
}
