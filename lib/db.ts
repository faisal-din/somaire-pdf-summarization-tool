import { neon } from '@neondatabase/serverless';

export async function getDbConnection() {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('Neon DATABASE_URL environment variable is not set');
  }

  const sql = neon(process.env.NEON_DATABASE_URL!);
  return sql;
}
