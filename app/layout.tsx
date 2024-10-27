import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrainflashAI",
  authors: { name: "Ruben Arevalo, Mauro Castillo, Maviya Yaseen, Henry Tran" },
  keywords: ["AI", "AI flashcards", "BrainflashAI", "AI study cards"],
  description: "An AI-powered flashcard app that helps students remember complex concepts in mere minutes!",
  metadataBase: new URL("https://www.brainflashai.com/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
