import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashbackAI",
  authors: {name: "Ruben Arevalo, Mauro Castillo, Maviya Yaseen, Henry Tran"},
  keywords: ["AI", "AI flashcards", "FlashbackAI", "AI study cards"],
  description: "An AI-powered flashcard app that helps students remember complex concepts in mere minutes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
