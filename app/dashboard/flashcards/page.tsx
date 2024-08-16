"use client";
import { useEffect, useState } from "react";
import { Flashcard, FlashcardResponse } from "@/app/types/types.config";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [description, setDescription] = useState<string>("");

  // Function that will use the OpenAI API to generate a list
  // of flashcards, which will be stored in its respective
  // state variable of the same name.
  const generateFlashcards = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload.
    e.preventDefault();

    // Implement a try-catch block to handle
    // unexpected errors.
    try {
      // Generate the flashcards in the /api/generate
      // route.
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: description,
        }),
      });

      // Retrieve the JSON response that contains the
      // relevant information of each flashcard.
      const data: FlashcardResponse = await res.json();

      // Update the 'flashcards' state variable with
      // the generated flashcards stored in the response.
      setFlashcards(data.message.flashcards);
    } catch (error) {
      // Throw an error message in case flashcards failed
      // to be generated.
      throw new Error("Failed to generate flashcards.");
    }
  };

  // Function that will either show the front or back
  // of a flashcard.
  const showCard = (i: number) => {
    setFlashcards((prev) => {
      // Create a copy of the original flashcards state variable
      // array so that the modification of the key, 'shown',
      // can be modified based on the corresponding index of the
      // flashcard.
      const data = [...prev];

      // If the card is not shown, set the shown
      // key value to true to show it.
      if (!data[i].shown) {
        data[i].shown = true;
      }

      // Otherwise, set it to false to hide it.
      else {
        data[i].shown = false;
      }

      // Return the modified data to set the
      // changes to the 'flashcards' state
      // variable.
      return data;
    });
  };

  return (
    <>
      <form onSubmit={generateFlashcards} className="p-10 flex flex-col gap-16">
        <label className="text-4xl text-center">Enter Your Notes</label>
        <textarea
          cols={30}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
      {flashcards.length > 0 && (
        <section className="grid grid-cols-3 place-items-center max-sm:grid-cols-2 text-black gap-10 ml-7 mr-7">
          {/* <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
              backgroundColor: "#fff",
            }}
          >
            <h5>{flashcards[0].front}</h5>
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              transform: "rotateY(180deg)",
            }}
          >
            <h5>{flashcards[0].back}</h5>
          </div> */}
          {flashcards.map((card, i) => (
            <figure
              key={`flashcard-${i}`}
              className="flex flex-row items-center p-10 rounded-lg cursor-pointer bg-slate-300 space-y-5 h-60 w-3/4"
              onClick={() => showCard(i)}
            >
              {!card.shown ? (
                <h1 className="text-2xl font-extrabold">{card.front}</h1>
              ) : (
                <p className="text-lg">{card.back}</p>
              )}
            </figure>
          ))}
        </section>
      )}
    </>
  );
};

export default Flashcards;
