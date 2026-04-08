import { SUMMARY_SYSTEM_PROMPT } from '@/constants';
import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    'GEMINI_API_KEY is not set. Please set it in your environment variables.'
  );
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const contents = [
      {
        role: 'user',
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText})`,
          },
        ],
      },
    ];

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    });
    // console.log('gemini response: ', response);

    if (!response || !response.text) {
      throw new Error('No response or empty text received from Gemini.');
    }

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini.');
    }

    return text;
  } catch (error) {
    console.error('Error generating summary with Gemini:', error);
    throw error;
  }
};
