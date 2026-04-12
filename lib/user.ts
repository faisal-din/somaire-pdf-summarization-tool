import { getDbConnection } from './db';

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  const priceId = query[0]?.price_id;

  return priceId || null;
}
