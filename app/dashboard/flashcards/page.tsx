"use client";
import { useState } from "react";
import { Flashcard, FlashcardResponse } from "@/app/types/types.config";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [description, setDescription] = useState<string>("");

  const generateFlashcards = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
        }),
      });

      const data: FlashcardResponse = await res.json();
      setFlashcards(data.message.flashcards);
    } catch (error) {
      throw new Error("Failed to generate flashcards.");
    }
  };

  const showCard = (i: number) => {
    setFlashcards((prev) => {
      const oldData = [...prev]
      
      if (oldData[i].shown) {
        oldData[i].shown = false;
      } else {
        oldData[i].shown = true;
      }

      return oldData
    })
  }

  return (
    <>
      <form onSubmit={generateFlashcards} className="p-10 flex flex-col gap-16">
        <label className="text-4xl text-center">Enter Your Notes</label>
        <textarea
          cols={30}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
          className="p-5 text-black outline-none resize-none rounded-lg border-none"
          required
        ></textarea>
        <button
          type="submit"
          className="p-5 bg-white rounded-lg text-black font-extrabold text-xl"
        >
          Generate Flashcards
        </button>
      </form>
      <section className="grid grid-cols-3 place-items-center max-sm:grid-cols-2 text-black gap-10 ml-7 mr-7">
        {flashcards.map((card, i) => 
          <figure key={`flashcard-${i}`} className="p-10 rounded-lg bg-slate-300 space-y-5" onClick={() => showCard(i)}>
            {!card.shown ?
              <h1 className="text-2xl font-extrabold">
              {card.front}
              </h1>
              :
              <p className="text-lg">{card.back}</p>
            }
          </figure>
        )}
      </section>
    </>
  );
};

export default Flashcards;
