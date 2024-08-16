"use client";
import React from "react";
import Link from "next/link";
import mainLogo from "../images/mainLogo.png";
import { useAuth, SignOutButton } from "@clerk/nextjs";

const Navigation = () => {
  const auth = useAuth();

  return (
    <nav className="flex flex-row fixed top-0 w-screen z-10 bg-white p-5 justify-between items-center shadow-lg">
      <ul>
        <li>
          <Link href="/">
            <img
              src={mainLogo.src} // Update with the correct path to your logo
              alt="BrainFlashAI Logo"
              className="sm:h-12" // Adjust the height as needed
            />
          </Link>
        </li>
      </ul>
      {!auth?.isSignedIn ? (
        <ul className="flex flex-row justify-center p-2 gap-10">
          <li className="p-3 max-sm:hidden">
            <Link href="/login">Sign In</Link>
          </li>
          <li className="p-3 max-sm:hidden">
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row space-between p-2 gap-10">
          <li className="p-3">
            <SignOutButton />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
