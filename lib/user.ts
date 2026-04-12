import { getUserUploadCountAction } from '@/actions/summary.action';
import { getDbConnection } from './db';
import { pricingPlans } from '@/constants';

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  const priceId = query[0]?.price_id;

  return priceId || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCountAction(userId);

  const priceId = await getPriceIdForActiveUser(userId);

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  const isPro = plan?.id === 'pro';

  const uploadLimit: number = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}
