"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import ReactGA from 'react-ga4';

type TransactionStatus = {
  loading: boolean,
  session: Stripe.Response<Stripe.Checkout.Session> | null,
  error: boolean | null
}

const PaymentResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [status, setStatus] = useState<TransactionStatus>({
    loading: true,
    session: null,
    error: null,
  });

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) {
        setStatus({...status, loading: false, error: true})
        return;
      }

      try {
        const res = await fetch(
          `api/checkout_sessions?session_id=${session_id}`
        );

        if (res.ok) {
          const data: Stripe.Response<Stripe.Checkout.Session> = await res.json();
          setStatus({ ...status, session: data });
        } else {
          console.log("Not working.")
          setStatus({ ...status, error: true });
        }
      } catch {
        throw new Error("Failed to retrieve checkout session.");
      } finally {
        setStatus({ ...status, loading: false });
      }
    };
    fetchCheckoutSession();

    // setTimeout(() => {
    //   router.push("/dashboard")
    // }, 5000)
  }, []);

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: "/result", title: "Transaction Processed Page"})
  }, [])

  return (
    <>
      {!status.loading ? (
        !status.error ? (
          <div className="flex flex-row items-center justify-center">
            {status.session?.payment_status == "paid" ?
                <p className="text-4xl">Payment successful! You will receive an email with the order details shortly.</p>
                :
                <p className="text-4xl">Payment failed to be processed.</p>
            }
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <p className="text-4xl">There was an error processing your transaction.</p>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-40">
          <svg
            className="w-12 h-12 text-[#1476bc] animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            ></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default PaymentResult;