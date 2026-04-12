import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from '@/lib/payments';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  const payload = await request.text();

  const sig = request.headers.get('stripe-signature');

  let event;

  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endPointSecret!);

    switch (event.type) {
      case 'checkout.session.completed':
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items'],
        });

        await handleCheckoutSessionCompleted({
          session,
          stripe,
        });

        // Handle successful checkout session
        console.log('Checkout Session Completed:', session);
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        // Handle subscription cancellation
        await handleSubscriptionDeleted({
          subscriptionId,
          stripe,
        });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { success: false, error: 'Webhook error' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: 'success',
    message: 'Payment processed successfully',
  });
};
