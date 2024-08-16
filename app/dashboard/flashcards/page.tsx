"use client";
import { useEffect, useState } from "react";
import { Flashcard, FlashcardResponse } from "@/app/types/types.config";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ReactCardFlip from "react-card-flip";

const Flashcards = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const saveFlashcards = async () => {
    // Function to create a store a collection of flashcards in Firestore db
    // based on a collection name set by the user.
    if (!name) {
      alert("Please enter a name");
      return;
    }

    // Create a batch to write all flashcard objects in one instance

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user!.id);
    const docSnap = await getDoc(userDocRef);

    console.log("User ID:", user!.id);
    console.log("Document Snapshot Exists:", docSnap.exists()); // Debugging line
    console.log("User Document Reference:", userDocRef); // Debugging line

    if (docSnap.exists()) {
      // if a user document exists continue
      console.log("docsnap exists"); // Debugging line
      const collections = docSnap.data().flashcards || [];

      if (collections.find((f: { name: string }) => f.name === name)) {
        // if the flashcard collection already exists, alert user and return
        // without saving the collection
        alert("Flashcard collection with the same name already exists");
        return;
      } else {
        // otherwise save the flashcard collection in a batch
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      // if a user document does not exist, create a new document for the user and
      // save the flashcard collection in a batch
      console.log("Document does not exist."); // Debugging line
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    // Commit the batch to the db and route to dashboard/flashcards
    await batch.commit();
    handleClose();
    router.push("/dashboard/flashcards");
  };

  return (
    <>
      <form
        onSubmit={generateFlashcards}
        className="p-10 flex flex-col gap-16 w-full bg-gradient-to-t from-[#1476bc] to-[#9fbedb] rounded-lg shadow-lg max-w-3xl mx-auto"
      >
        <label
          className="text-4xl text-center font-semibold text-white"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Enter Your Notes
        </label>
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
          style={{ fontFamily: "'Raleway', 'sans-serif" }}
        >
          Generate Flashcards
        </button>
      </form>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg
            className="w-12 h-12 text-[#1476bc] animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            ></path>
          </svg>
          <h1 className="p-5 font-semibold text-xl"> Generating...</h1>
        </div>
      ) : (
        flashcards.length > 0 && (
          <section className="grid grid-cols-3 place-items-center max-sm:grid-cols-1 text-black gap-10 m-7 mt-10">
            {flashcards.map((card, i) => (
              <figure
                key={`flashcard-${i}`}
                className={`flex items-center justify-center rounded-lg cursor-pointer w-64 h-40`}
                onClick={() => showCard(i)}
              >
                <ReactCardFlip
                  isFlipped={card.shown}
                  flipDirection="horizontal"
                  containerStyle={{ width: "100%", height: "100%" }}
                >
                  <div className="flex items-center justify-center w-full h-full bg-white p-5 rounded-lg shadow-lg font-raleway">
                    <h5 className="text-xl">{card.front}</h5>
                  </div>
                  <div className="flex items-center justify-center w-full h-full bg-white p-5 rounded-lg shadow-lg font-raleway">
                    <h5 className="text-xl">{card.back}</h5>
                  </div>
                </ReactCardFlip>
              </figure>
            ))}
          </section>
        )
      )}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleOpen}
          className="p-5 bg-[#1476bc] text-white rounded-lg shadow-lg font-extrabold text-xl transition-colors hover:bg-[#0a3f5d]"
          style={{
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Save
        </button>
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h6>Save Flashcards</h6>
          <p>Please enter a name for your flashcards collection</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Collection Name"
            style={{
              width: "100%",
              marginBottom: "16px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleClose}
              style={{
                padding: "10px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
            <button
              onClick={saveFlashcards}
              style={{
                padding: "10px",
                backgroundColor: "#1476bc",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Flashcards;
