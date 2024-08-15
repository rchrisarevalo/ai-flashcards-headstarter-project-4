"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Nav";
import { SignOutButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <main className="flex min-h-screen bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 flex-col gap-20 items-center justify-center p-24">
      <Navigation />
      <div className="mt-36 mb-16 space-y-20">
        <section className="text-center space-y-5 ml-20 mr-20">
          <h1 className="text-5xl font-extrabold">FlashbackAI</h1>
          <h5 className="text-3xl font-light">
            Tired of having to look through your notes?
          </h5>
          <h5 className="text-3xl font-light">
            Tired of having to read TLDR posts or watch long
            <br></br>
            videos to prepare for upcoming quizzes and exams?
          </h5>
        </section>
        <section className="text-center space-y-5">
          <p className="text-2xl font-extralight">
            Look no further than with our AI-powered flashcard application,
            <br></br>
            <b>FlashbackAI</b>, a tool that can help students simplify their
            lecture
            <br></br>
            notes into simple flashcards that they can use to memorize
            <br></br>
            and better understand concepts!
          </p>
        </section>
        <section className="flex flex-row justify-center max-sm:flex-col gap-5 items-center">
          <figure className="bg-slate-100 text-black p-8 rounded-xl w-60 h-60 flex items-center justify-center">
            Hi there!
          </figure>
          <figure className="bg-slate-100 text-black p-8 rounded-xl w-60 h-60 flex items-center justify-center">
            Hi there!
          </figure>
        </section>
        <section className="text-center space-y-5 max-sm:ml-20 max-sm:mr-20">
          <p className="text-2xl font-semibold">
            Create an account or sign in to get started!
          </p>
        </section>
        <section className="flex flex-row items-center font-bold gap-10 justify-center">
          {!auth?.isSignedIn ?
            <>
              <button
                className="p-5 pl-7 pr-7 bg-white text-black rounded-lg"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <button
                className="p-5 pl-7 pr-7 bg-white text-black rounded-lg"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </>
            :
            <SignOutButton />
          }
        </section>
      </div>
    </main>
  );
}
