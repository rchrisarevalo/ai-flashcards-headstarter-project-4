"use client";
import { useEffect, useState } from "react";
import { Flashcard, FlashcardResponse } from "@/app/types/types.config";
import ReactCardFlip from 'react-card-flip';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
 
  // Function that will use the OpenAI API to generate a list
  // of flashcards, which will be stored in its respective
  // state variable of the same name.
  const generateFlashcards = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload.
    e.preventDefault();
    setLoading(true);

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
    } finally {
      setLoading(false);
      if(flashcards.length == 0)
      {
        print("unknown topic")
      }
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
      <form onSubmit={generateFlashcards} className="p-10 flex flex-col gap-16 w-full bg-gradient-to-t from-[#1476bc] to-[#9fbedb] rounded-lg shadow-lg max-w-3xl mx-auto">
        <label className="text-4xl text-center font-semibold text-white"
        style={{ fontFamily: "'Raleway', sans-serif" }}>Enter Your Notes</label>
        <textarea
          cols={30}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="p-5 text-black outline-none resize-none rounded-lg border-none w-full h-40 overflow-y-auto"
          placeholder="Type your lecture notes or topic here..."
          required
        ></textarea>
        <button
          type="submit"
          className="p-5 bg-[#1476bc] text-white rounded-lg shadow-lg font-extrabold text-xl transition-colors hover:bg-[#0a3f5d]"
          style={{ fontFamily: "'Raleway', 'sans-serif" }}>
          Generate Flashcards
        </button>
      </form>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg className="w-12 h-12 text-[#1476bc] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
          </svg>
          <h1 className="p-5 font-semibold text-xl">    Generating...</h1>
        </div>
      ) :
      (flashcards.length > 0 && (
        <section className="grid grid-cols-2 place-items-center max-sm:grid-cols-1 text-black gap-10 m-7 mt-10">
          {flashcards.map((card, i) => (
            <figure
              key={`flashcard-${i}`}
              className={`flex items-center justify-center rounded-lg cursor-pointer w-64 h-40`}
              onClick={() => showCard(i)}
            >
              <ReactCardFlip isFlipped={card.shown} flipDirection="horizontal" containerStyle={{width:'100%', height: '100%'}}>
               <div className="flex items-center justify-center w-full h-full bg-white p-5 rounded-lg shadow-lg font-raleway">
               <h5 className="text-xl">{card.front}</h5>
             </div>
             <div className="flex items-center justify-center w-full h-full bg-white p-5 rounded-lg shadow-lg font-raleway">
               <h5 className="text-xl">{card.back}</h5>
             </div>
           </ReactCardFlip>
            </figure>
          )
          )}
        </section>
      ))}
    </>
  );
};

export default Flashcards;
