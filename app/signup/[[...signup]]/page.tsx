'use client';
import Navigation from "@/app/components/Nav";
import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import ReactGA from 'react-ga4'

const SignUpPage = () => {

  useEffect(() => {
    ReactGA.send({hitType: 'pageview', page: "/signup", title: "Sign Up Page"})
  }, [])

  return (
    <div className="flex justify-center max-sm:mt-20 bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] items-center h-screen">
      <Navigation />
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default SignUpPage;
