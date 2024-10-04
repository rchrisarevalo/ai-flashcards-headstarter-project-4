"use client";
import Navigation from "@/app/components/Nav";
import { useContext } from "react";

const Account = () => {
  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/cancel_subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: "",
        }),
      });

      if (res.ok) {
        const data = await res.json();

        console.log(data);
      } else {
        console.error("Subscription failed to be cancelled. Try again.");
      }
    } catch {
      throw new Error("Subscription could not be cancelled.");
    }
  };

  return (
    <>
        <Navigation />
        <h1 className="text-5xl text-black font-extrabold">Account Settings</h1>
        <i className="text-lg font-medium">Manage your subscription:</i>
        <button className="p-5 pl-10 pr-10 bg-blue-600 text-white rounded-lg" onClick={cancelSubscription}>Cancel Subscription</button>
    </>
  );
};

export default Account;
