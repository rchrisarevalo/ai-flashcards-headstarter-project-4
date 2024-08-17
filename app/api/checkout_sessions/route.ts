import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const formatAmountForStripe = (amount: number) => {
  return Math.round(amount * 100);
};

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    const checkout_session = await stripe.checkout.sessions.retrieve(session_id as string)

    return NextResponse.json(checkout_session, {
      status: 200
    })
  } catch(error) {
    return NextResponse.json({message: error}, {status: 500})
  }
}

const POST = async (req: NextRequest) => {
  const data = await req.json()

  if (data.premium_selected) {
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "BrainflashAI Pro Subscription",
            },
            unit_amount: formatAmountForStripe(10),
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/result?session_id={CHECKOUT_SESSION_ID}`,
    };
  
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
  
    return NextResponse.json(checkoutSession, {
      status: 200
    })
  } else {
    return NextResponse.json({message: "You switched to the basic plan."}, {status: 200})
  }
};

export { GET, POST };
