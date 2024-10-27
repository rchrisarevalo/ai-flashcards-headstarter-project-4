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
          <li className="p-3 max-sm:hidden group">
            <Link href="/login" className="relative inline-block">
              Sign In
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li className="p-3 max-sm:hidden group">
            <Link href="/signup" className="relative inline-block">
              Sign Up
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row space-between p-2 gap-10">
          <li className="p-3 group">
            <Link href="/dashboard" className="relative inline-block">
              {" "}
              My Dashboard
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li className="p-3 group">
            <Link
              href="/dashboard/flashcards"
              className="relative inline-block"
            >
              {" "}
              Generate New Set
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </li>
          <li className="p-3 group">
            <div className="relative inline-block">
              <SignOutButton />
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
