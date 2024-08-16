"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Nav";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import '@fontsource/raleway';
import '@fontsource/roboto';

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <main className="flex min-h-screen bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] flex-col items-center justify-center p-10" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Navigation />
      <div className="flex flex-col items-center mt-36 mb-16 space-y-16 w-full max-w-4xl max-sm:w-screen">
        <section className="text-center space-y-5 px-6">
          <h1 className="text-6xl font-extrabold text-[#1476b]" style={{ fontFamily: "'Raleway', sans-serif" }}>
            BrainflashAI
          </h1>
          <h5 className="text-3xl font-light text-gray-700">
            Tired of sorting through endless notes?
          </h5>
          <h5 className="text-3xl font-light text-gray-700">
            Tired of those long never-ending exam prep videos?
          </h5>
        </section>
        <section className="text-center space-y-5 px-6">
          <p className="text-2xl font-extralight text-gray-600">
          Meet <b className="text-[#1476bc]" 
          style={{ fontFamily: "'Raleway', sans-serif" }}>
            BrainflashAI
            </b>, 
          <br></br>
          the AI-powered flashcard app that 
          <br></br>
          transforms your <b>lecture notes</b> into <b>easy-to-use flashcards</b>,
          <br></br>
          helping you memorize and understand concepts better!
          </p>
        </section>
        <section className="text-center space-y-5 max-w-md mx-auto max-sm:ml-20 max-sm:mr-20">
          <p className="text-2xl font-semibold text-gray-700">
          Create an account or sign in to start mastering your studies!
          </p>
        </section>
        <section className="flex flex-col sm:flex-row items-center font-bold gap-5 justify-center">
          {!auth?.isSignedIn ?
            <>
              <button
                className="p-4 sm:p-5 bg-[#1476bc] text-white rounded-lg hover:bg-[#0f5a8b] transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <button
                className="p-4 sm:p-5 bg-[#1476bc] text-white rounded-lg hover:bg-[#0f5a8b] transition-colors"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </>
            :
            <SignOutButton />
          }
        </section>
        <section className="flex flex-wrap justify-center gap-5">
          <figure className="bg-white text-black p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-60 h-60 flex items-center justify-center">
            <span className="text-xl font-semibold">My Dashboard</span>
          </figure>
          <figure className="bg-white text-black p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-60 h-60 flex items-center justify-center">
            <span className="text-xl font-semibold">Generate New Set</span>
          </figure>
        </section>
      </div>
    </main>
  );
}
