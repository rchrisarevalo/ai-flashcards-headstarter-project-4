"use client";
import { useState } from "react";
import { Flashcard, FlashcardResponse } from "@/app/types/types.config";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [description, setDescription] = useState<string>("")

  const generateFlashcards = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "GET",
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

  return (
    <>
      <form className="p-10 flex flex-col gap-16">
        <label className="text-4xl">Enter Your Notes</label>
        <textarea
          cols={50}
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
    </>
  );
};

export default Flashcards;
