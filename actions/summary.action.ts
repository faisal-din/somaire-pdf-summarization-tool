'use server';

import { getDbConnection } from '@/lib/db';
import { ErrorResponse } from '@/types/action';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getSummariesAction(userId: string) {
  const sql = await getDbConnection();

  const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
    `;
  return summaries;
}

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

    return ErrorResponse('Summary not found or not authorized to delete');
  } catch (error) {
    console.error('Error deleting summary:', error);
    return ErrorResponse(
      error instanceof Error ? error.message : 'Error deleting summary'
    );
  }
}
