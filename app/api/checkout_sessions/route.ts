import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const formatAmountForStripe = (amount: number) => {
  return Math.round(amount * 100);
};

const POST = async (req: NextRequest) => {
  // const params: Stripe.Checkout.SessionCreateParams = {
  //   submit_type: "pay",
  //   payment_method_types: ["card"],
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: "BrainflashAI Pro Subscription",
  //         },
  //         unit_amount: formatAmountForStripe(10),
  //         recurring: {
  //           interval: "month",
  //           interval_count: 1,
  //         },
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  // };
  // const checkoutSession: Stripe.Checkout.Session =
  //   await stripe.checkout.sessions.create(params);

  // return NextResponse.json(checkoutSession, {
  //   status: 200
  // })

  return NextResponse.json({
    message: "This works!"
  }, {
    status: 200
  })
};

export { POST };
