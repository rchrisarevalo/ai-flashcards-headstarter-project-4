"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

import "@fontsource/raleway";
import "@fontsource/roboto";
import { Flashcard } from "../types/types.config";

const Dashboard = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardCollection() {
      if (!user) return;

      const docRef = doc(collection(db, "users"), user.id);
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
    <>
      <h1
        className="text-6xl max-sm:text-5xl font-extrabold text-[#1476bc] text-center"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        Your Dashboard
      </h1>
      <i
        className="text-xl ml-7 mr-7 font-light text-center block mb-10"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Flashcard Collection
      </i>
      <section className="grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center p-5 bg-white">
        {flashcards.map((flashcard, index) => (
          <figure
            className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black shadow-lg transform transition-transform hover:scale-105 w-full h-50"
            key={index}
            onClick={() => handleCardClick(flashcard.name)}
          >
            <h3 className="text-2xl font-extrabold text-[#1476bc]">
              {flashcard.name}
            </h3>
          </figure>
        ))}
      </section>
    </>
  );
};

export default Dashboard;
