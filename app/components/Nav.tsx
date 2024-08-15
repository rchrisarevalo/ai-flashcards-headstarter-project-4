'use client';
import React from "react";
import Link from "next/link";
import { useAuth, SignOutButton } from "@clerk/nextjs";

const Navigation = () => {

    const auth = useAuth();

    return (
        <nav className="flex flex-row fixed top-0 w-screen z-10 bg-slate-600 bg-opacity-50 p-5 justify-between items-center">
            <ul>
                <li><h2 className="text-3xl p-2 font-extrabold"><Link href="/">BrainflashAI</Link></h2></li>
            </ul>
            {!auth?.isSignedIn ?
                <ul className="flex flex-row justify-center p-2 gap-10">
                    <li className="p-3 max-sm:hidden"><Link href="/login">Sign In</Link></li>
                    <li className="p-3 max-sm:hidden"><Link href="/signup">Sign Up</Link></li>
                </ul>
                :
                <ul className="flex flex-row space-between p-2 gap-10">
                    <li className="p-3"><SignOutButton /></li>
                </ul>
            }
        </nav>
    )
}

export default Navigation;