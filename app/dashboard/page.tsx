"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactGA from "react-ga4";

import "@fontsource/raleway";
import "@fontsource/roboto";
import { Flashcard } from "../types/types.config";

const Dashboard = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const router = useRouter();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/dashboard",
      title: "Dashboard Page",
    });
  }, []);

  useEffect(() => {
    async function getFlashcardCollection() {
      if (!user) return;

      const docRef = doc(collection(db, "users"), user?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcardCollection();
  }, [user]);

  const handleCardClick = (name: string) => {
    router.push(`/dashboard/flashcards?id=${name}`);
  };

  return (
    <span className="mt-24 mb-24 max-sm:mt-5 space-y-10">
      <h1
        className="text-6xl max-sm:text-5xl font-extrabold text-[#1476bc] text-center mt-20"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Your Dashboard
      </h1>
      <i
        className="text-xl ml-7 mr-7 font-light text-center block"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Flashcard Collection
      </i>
      <br></br>
      <Link href="/dashboard/flashcards">
        <figure className="hover:bg-slate-100 bg-white border-4 border-[#1476bc] text-black p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-100 h-30 flex items-center justify-center ml-[30%] mr-[30%] max-sm:ml-[10%] max-sm:mr-[10%]">
          <span className="text-xl font-semibold">Generate New Set</span>
        </figure>
      </Link>
      <section className="grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center p-5 bg-white">
        {flashcards.map((flashcard, index) => (
          <figure
            className="hover:cursor-pointer hover:bg-slate-100 bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black shadow-lg transform transition-transform hover:scale-105 w-full h-50"
            key={index}
            onClick={() => handleCardClick(flashcard.name)}
          >
            <h3 className="text-2xl font-extrabold text-[#1476bc] text-center">
              {flashcard.name}
            </h3>
          </figure>
        ))}
      </section>
    </span>
  );
};

export default Dashboard;
