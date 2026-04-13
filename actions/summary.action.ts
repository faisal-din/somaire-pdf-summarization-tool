'use server';

import { getDbConnection } from '@/lib/db';
import { ErrorResponse } from '@/types/action';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Get all summaries for a user
export async function getSummariesAction(userId: string) {
  const sql = await getDbConnection();

  const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
    `;
  return summaries;
}

// Get a specific summary by ID (authorized)
export async function getSummaryByIdAction(summaryId: string) {
  try {
    const sql = await getDbConnection();

    const [summary] = await sql`
        SELECT 
         id, 
        user_id, 
        title, 
        original_file_url, 
        summary_text, 
        file_name, 
        status, 
        created_at, 
        updated_at,   
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
        FROM pdf_summaries
        WHERE id = ${summaryId}
    `;

    return summary;
  } catch (error) {
    console.error('Error fetching summary by ID:', error);
    return {
      success: false,
      message: 'Failed to fetch summary by ID.',
    };
  }
}

//Delete summary (authorized)
export async function deleteSummaryAction(summaryId: string) {
  try {
    const user = await currentUser();

    const userId = user?.id;
    if (!userId) {
      return ErrorResponse('User not found');
    }

    const sql = await getDbConnection();

    const result = await sql`
      DELETE FROM pdf_summaries
      WHERE id = ${summaryId} AND user_id = ${userId}
      RETURNING id;
    `;

    if (result.length > 0) {
      revalidatePath('/dashboard');
      return { success: true };
    }

    return ErrorResponse('Summary not found or unauthorized to delete');
  } catch (error) {
    console.error('Error deleting summary:', error);
    return ErrorResponse('Failed to delete summary.');
  }
}

export async function getUserUploadCountAction(userId: string) {
  try {
    const sql = await getDbConnection();
    const query = await sql`
        SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId} 
    `;

    const count = query[0]?.count || 0;
    return count;
  } catch (error) {
    console.error('Error fetching user upload count:', error);
    return 0;
  }
}
