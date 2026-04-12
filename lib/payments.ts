import Stripe from 'stripe';
import { getDbConnection } from './db';

interface CreateOrUpdateUserProps {
  sql: any;
  email: string;
  full_name: string;
  customerId: string;
  price_id: string;
  status: string;
}

// Handles post-checkout: upserts user and logs payment
export const handleCheckoutSessionCompleted = async ({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}): Promise<{ success: boolean; message: string }> => {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ('email' in customer && priceId) {
    const { email, name } = customer;

    const sql = await getDbConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      full_name: name as string,
      customerId,
      price_id: priceId as string,
      status: 'active',
    });

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
    return { success: true, message: 'User and payment created successfully' };
  }

  return { success: false, message: 'Missing customer email or price ID' };
};

// Marks user as cancelled when their subscription is deleted
export const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnection();
    await sql`
                UPDATE users 
                SET status = 'cancelled' 
                WHERE customer_id = ${subscription.customer}
            `;

    return { success: true, message: 'Subscription cancelled successfully' };
  } catch (error) {
    console.error('Error updating user status:', error);
    throw new Error('Failed to update user status');
  }
};

// Inserts user if not found; skips update if already exists
async function createOrUpdateUser({
  sql,
  email,
  full_name,
  customerId,
  price_id,
  status,
}: CreateOrUpdateUserProps): Promise<{ success: boolean; message: string }> {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email} `;

    if (user.length === 0) {
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${full_name}, ${customerId}, ${price_id}, ${status})
      `;
    }

    return { success: true, message: 'User created or updated successfully' };
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw error;
  }
}

// Inserts a payment record linked to the user and Stripe session
async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const { amount_total, id, customer_email, status } = session;

    await sql`
      INSERT INTO payments (
      amount, 
      status,
      stripe_payment_id,
      price_id,
      user_email
      ) VALUES (
        ${amount_total}, 
        ${status},
        ${id}, 
        ${priceId},
        ${userEmail} 
       ) 
    `;

    return { success: true, message: 'Payment recorded successfully' };
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('Failed to create payment');
  }
}
