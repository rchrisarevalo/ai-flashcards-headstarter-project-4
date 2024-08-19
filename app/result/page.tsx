"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import Loading from "../loading";
import Link from "next/link";

type LoadingStatus = {
  loading: boolean;
  error: boolean | null;
};

const PaymentResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [status, setStatus] = useState<LoadingStatus>({
    loading: true,
    error: null,
  });

  const [session, setSession] =
    useState<Stripe.Response<Stripe.Checkout.Session>>();

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) {
        setStatus({ ...status, loading: false, error: true });
        return;
      }

      try {
        const res = await fetch(
          `api/checkout_sessions?session_id=${session_id}`
        );

        if (res.ok) {
          const data: Stripe.Response<Stripe.Checkout.Session> =
            await res.json();
          setSession(data);
        } else {
          console.log("Not working.");
          setStatus({ ...status, error: true });
        }
      } catch {
        throw new Error("Failed to retrieve checkout session.");
      } finally {
        setStatus({ ...status, loading: false });
      }
    };
    fetchCheckoutSession();
  }, []);

  return (
    <>
      {!status.loading ? (
        !status.error ? (
          <div className="flex flex-col gap-5 items-center text-center max-sm:w-3/4 justify-center">
            {session?.payment_status == "paid" ? (
              <>
                <h1 className="text-5xl font-extrabold">Payment Successful</h1>
                <p className="text-xl">
                  You will receive an email with the order details shortly.
                </p>
                <button
                  className="p-5 w-full text-lg text-white font-extrabold bg-blue-700 rounded-xl"
                  onClick={() => router.push("/dashboard")}
                >
                  Go To Dashboard
                </button>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-extrabold">
                  Payment Failed To Process
                </h1>
                <p className="text-xl">
                  Please go back to the{" "}
                  <Link href="/dashboard/plans">Plans</Link> page and try again.
                </p>
                <button 
                  className="p-5 w-full text-lg text-white font-extrabold bg-blue-700 rounded-xl"
                  onClick={() => router.push("/dashboard/plans")}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center ml-10 mr-10">
            <p className="text-4xl">
              There was an error processing your transaction.
            </p>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-40">
          <Loading />
        </div>
      )}
    </>
  );
};

export default PaymentResult;
