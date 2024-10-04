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

export type Subscription = {
  subscription_id: string,
  subscription_type: string,
  paid_status: boolean,
  customer_id: string,
  billing_period_start: Date,
  billing_period_end: Date,
  cancel_at_period_end: boolean
};

export type SubsCtxInfo = {
  userSubscription: Subscription;
  setUserSubscription: React.Dispatch<React.SetStateAction<Subscription>>
}