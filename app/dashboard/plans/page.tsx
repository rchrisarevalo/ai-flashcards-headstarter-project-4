"use client";
import getStripe from "@/utils/get-stripe";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga4';

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
  };

  return (
    <form onSubmit={handleSubmission} className="flex flex-col mt-24 max-sm:mb-16 items-center min-h-screen w-full justify-center gap-10">
      <h1 className="font-extrabold text-5xl mt-20">Plans & Pricing</h1>
      <i className="text-xl">Select from the following options:</i>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-10 items-center">
        <figure onClick={() => handleFigureClick("basic")} 
        className={`p-12 bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] rounded-lg space-y-5 w-80 text-black cursor-pointer transition-transform duration-300 ${paymentSelection.basic_selected ? "transform scale-105 border-4 border-blue-500" : ""}`}>
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
        className={`p-12 bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] rounded-lg space-y-5 w-80 text-black cursor-pointer transition-transform duration-300 ${paymentSelection.premium_selected ? "transform scale-105 border-4 border-blue-500" : ""}`}>
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
      <button
        type="submit"
        className="pl-10 pr-10 p-5 mb-20 rounded-lg bg-blue-600 text-white font-bold"
      >
        Proceed
      </button>
    </form>
  );
};

export default PaymentOptions;
