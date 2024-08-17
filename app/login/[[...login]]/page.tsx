'use client';
import Navigation from "@/app/components/Nav";
import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import ReactGA from 'react-ga4';

export default function Login() {
  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: "/login", title: "Login Page"})
  }, [])
  
  return (
    <div className="flex justify-center bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] items-center h-screen">
      <Navigation />
      <SignIn path="/login" signUpUrl="/signup" fallbackRedirectUrl={"/"} />
    </div>
  );
}
