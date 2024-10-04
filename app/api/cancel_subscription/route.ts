import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // Provide the subscription ID to allow the customer to cancel
    // their subscription.
    const subscription: Stripe.Response<Stripe.Subscription> =
      await stripe.subscriptions.cancel(data.subscription_id);

    // Return the relevant information containing information about
    // their cancellation.
    return NextResponse.json(subscription, {
      status: 200,
    });
  } catch {
    // Otherwise, return an error response if the subscription
    // failed to be cancelled.
    return NextResponse.json(
      { message: "Subscription could not be cancelled. Please try again." },
      { status: 403 }
    );
  }
};

export { POST };
