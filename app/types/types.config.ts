// File containing custom-defined types that will
// be used throughout the project.

export type FlashcardResponse = {
  status: number;
  message: {
    flashcards: Flashcard[];
  };
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  shown: boolean;
  name: string;
};
