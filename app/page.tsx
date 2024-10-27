"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Nav";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import "@fontsource/raleway";
import "@fontsource/roboto";
import Link from "next/link";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import roundLogo from "./images/roundLogo.png";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
  }, []);

  return (
    <main
      className="flex min-h-screen bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] flex-col items-center justify-center p-10"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <Navigation />
      <div className="flex flex-col mt-36 mb-36 space-y-16 w-full max-w-4xl max-sm:w-screen">
        <div className="flex flex-col sm:flex-row items-center space-y-16 sm:space-y-0 sm:space-x-10">
          <div className="flex flex-col space-y-10 w-full sm:w-1/2">
            <section className="text-center sm:text-left space-y-5 px-6">
              <h1
                className="text-6xl font-extrabold text-[#1476b]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                BrainflashAI
              </h1>
              <h5 className="text-3xl font-light text-gray-700">
                Tired of sorting through endless notes?
              </h5>
              <h5 className="text-3xl font-light text-gray-700">
                Tired of those long never-ending exam prep videos?
              </h5>
            </section>
            <section className="text-left space-y-5 px-6">
              <p className="text-2xl font-extralight text-gray-600">
                Meet{" "}
                <b
                  className="text-[#1476bc]"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  BrainflashAI
                </b>
                ,<br></br>
                the AI-powered flashcard app that
                <br></br>
                transforms your <b>lecture notes</b> into{" "}
                <b>easy-to-use flashcards</b>,<br></br>
                helping you memorize and understand concepts better!
              </p>
            </section>
          </div>
          <div className="flex items-center justify-center w-full sm:w-1/2">
            <img
              src={roundLogo.src}
              alt="BrainflashAI Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
        {!auth?.isSignedIn ? (
          <>
            <section className="text-center pt-20 space-y-5 max-w-md mx-auto max-sm:ml-20 max-sm:mr-20">
              <p className="text-2xl font-semibold text-white">
                Create an account or sign in to start mastering your studies!
              </p>
            </section>
            <section className="flex flex-col sm:flex-row items-center font-bold gap-5 justify-center">
              <button
                className="p-2 sm:p-2 bg-white text-[#1476bc] rounded-lg hover:bg-blue-200 transition-colors shadow-lg"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <button
                className="p-2 sm:p-2 bg-white text-[#1476bc] rounded-lg hover:bg-blue-200 transition-colors shadow-lg"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </section>
          </>
        ) : (
          <>
            <section className="flex flex-wrap justify-start sm:justify-center gap-5">
              <Link href="/dashboard">
                <figure className="bg-white hover:bg-slate-100 text-black p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-50 h-20 flex items-center justify-center">
                  <span className="text-xl font-semibold">My Dashboard</span>
                </figure>
              </Link>
              <Link href="/dashboard/flashcards">
                <figure className="bg-white hover:bg-slate-100 text-black p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-50 h-20 flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    Generate New Set
                  </span>
                </figure>
              </Link>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
