"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import Loading from "../loading";
import Link from "next/link";
import { Subscription } from "../types/types.config";
import { collection, getDoc, doc, setDoc, writeBatch, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";

type LoadingStatus = {
  loading: boolean;
  error: boolean | null;
};

const PaymentResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const {user} = useUser();

  const [status, setStatus] = useState<LoadingStatus>({
    loading: true,
    error: null,
  });

  const [session, setSession] =
    useState<Stripe.Response<Stripe.Checkout.Session>>();

  const [userSubscription, setUserSubscription] = useState<Subscription>({
    subscription_id: "",
    subscription_type: "",
    paid_status: false,
    customer_id: "",
    billing_period_start: new Date(),
    billing_period_end: new Date(),
    cancel_at_period_end: false
  })

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

          let next_month_date = new Date()
          next_month_date.setMonth(next_month_date.getMonth() + 1)

          console.log(data)

          setUserSubscription({
            subscription_id: (data.subscription) as string,
            subscription_type: "pro",
            paid_status: data.payment_status == "paid" ? true : false,
            customer_id: (data.customer) as string,
            billing_period_start: new Date(),
            billing_period_end: next_month_date,
            cancel_at_period_end: false
          })
          
        } else {
          setStatus({ ...status, error: true });
        }
      } catch {
        throw new Error("Failed to retrieve checkout session.");
      } finally {
        setStatus({ ...status, loading: false });
      }
    };
    saveSubscription(userSubscription);
    fetchCheckoutSession();
    
  }, [session_id]);
  
  const saveSubscription = async (userSubscription: Subscription) => {
    try{
      if (!user || !user.id) {
        throw new Error("Missing user obj")
      }
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data()?.subscription || [];
        if (collections.find((f: {subscription_id: string}) =>f.subscription_id === userSubscription.subscription_id)) {
          alert("You already have a subscription")
          return;
        } else {
          await updateDoc(docRef, {
            subscription: arrayUnion(userSubscription)
          })
        }
        console.log("Subscription saved successfully")
      }
  } catch(error) {
      console.error("Error saving subscription", error);  
    }
  }

  console.log(userSubscription)

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
