"use client";
import getStripe from "@/utils/get-stripe";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga4';
import Link from "next/link";

type PaymentTypeSelected = {
  basic_selected: boolean;
  premium_selected: boolean;
};

const PaymentOptions = () => {
  const [paymentSelection, setPaymentSelection] = useState<PaymentTypeSelected>(
    {
      basic_selected: false,
      premium_selected: false,
    }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: "/dashboard/plans", title: "Plans & Pricing Page"})
  }, [])

  const handleFigureClick = (plan: "basic" | "premium") => {
    if (plan === "basic") {
      setPaymentSelection({
        basic_selected: true,
        premium_selected: false,
      });
    } else {
      setPaymentSelection({
        basic_selected: false,
        premium_selected: true,
      });
    }
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (paymentSelection.premium_selected) {
      try {
          const data = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
              origin: "http://localhost:3000",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentSelection),
          });

        const checkout_session_res = await data.json();

        if (checkout_session_res.status == 500) {
          console.error(checkout_session_res.message);
          return;
        }

        const stripe = await getStripe();
        const error = await stripe?.redirectToCheckout({
          sessionId: checkout_session_res.id,
        });

        if (error) {
          console.warn(error.error.message);
        } else {
          console.log("Processing...")
        }
      } catch {
        console.error("Failed to checkout!");
      }
    } else {
      return;
    //   try{
    //     if (!user || !user.id) {
    //       throw new Error("Missing user obj")
    //     }
    //     const docRef = doc(collection(db, "users"), user.id);
    //     const docSnap = await getDoc(docRef);
  
    //     if (docSnap.exists()) {
    //       const collections = docSnap.data()?.subscription || [];
    //       if (collections.find((f: {subscription_id: string}) =>f.subscription_id === userSubscription.subscription_id)) {
    //         alert("You already have a subscription")
    //         return;
    //       } else {
    //         await updateDoc(docRef, {
    //           subscription: arrayUnion(userSubscription)
    //         })
    //       }
    //       console.log("Subscription saved successfully")
    //     }
    // } catch(error) {
    //     console.error("Error saving subscription", error);  
    //   }
    }
  };

  return (
    <form onSubmit={handleSubmission} className="flex flex-col mt-24 max-sm:mb-16 items-center min-h-screen w-full justify-center gap-10">
      <h1 className="font-extrabold text-5xl mt-20">Plans & Pricing</h1>
      <i className="text-xl">Select from the following options:</i>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 items-center">
        <figure onClick={() => handleFigureClick("basic")} 
        className={`p-12 mb-10 bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] rounded-lg space-y-5 w-80 text-black cursor-pointer transition-transform duration-300 ${paymentSelection.basic_selected ? "transform scale-105 border-4 border-blue-900" : ""}`}>
          <h1 className="font-extrabold text-3xl">Basic Plan (Free)</h1>
          <hr></hr>
          <p className="text-xl font-bold">Includes:</p>
          <ul className="list-disc text-lg font-bold">
            <li>5 flashcard generations/month</li>
            <li>
              Max 500 characters for text-to-flashcard generation
            </li>
            <li>
              Save up to 5 flashcard collections for future use
            </li>
          </ul>
        </figure>
        <figure onClick= {() => handleFigureClick("premium")} 
        className={`p-12 mb-10 bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] rounded-lg space-y-5 w-80 text-black cursor-pointer transition-transform duration-300 ${paymentSelection.premium_selected ? "transform scale-105 border-4 border-blue-900" : ""}`}>
          <h1 className="font-extrabold text-3xl">Premium Plan ($9.99)</h1>
          <hr></hr>
          <p className="text-xl font-bold">Includes:</p>
          <ul className="list-disc text-lg font-bold">
            <li>Unlimited flashcard generations</li>
            <li>
              Max 2000 characters for text-to-flashcard generation
            </li>
            <li>
              Save up to 20 flashcard collections
            </li>
          </ul>
        </figure>
      </div>
      {loading ? (
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
          <h1 className="p-5 font-semibold text-xl"> Loading...</h1>
        </div>
      ) : (
        <>
        {saved && (
          <h1 className="font-semibold text-xl"> Saved Basic Plan!</h1>)}

        <div className="flex flex-row justify-space-between">
          {saved && (
            <Link href="/dashboard">
              <button className=" p-2 mr-5 mb-20 rounded-lg bg-blue-100 border-blue-900 border-2 text-black text-xl font-bold hover:bg-blue-900 hover:border-blue-300 hover:text-white"
              onClick={() => setLoading(true)}>
                Back to Dashboard
              </button>
            </Link>
          )}

        <button
        type="submit"
        className=" p-2 ml-5 mb-20 rounded-lg bg-blue-100 border-blue-900 border-2 text-black text-xl font-bold hover:bg-blue-900 hover:border-blue-300 hover:text-white"
        onClick={() => {
          if (paymentSelection.premium_selected) 
            {setTimeout(() => {setLoading(true)}, 100)}
          else if(paymentSelection.basic_selected)
            {setTimeout(() => {setSaved(true)}, 100)}
        }}
      >
        Proceed
      </button>
      </div>
      </>
      )}
    </form>
  );
};

export default PaymentOptions;
