import React from "react";
import { auth } from "@/auth";
import { SignIn, SignOut } from "./sign-in";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-zinc-600 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          Student Stay
        </a>
        {session ? (
          <div className="flex flex-row items-center gap-4">
            <span className="mr-4">Welcome, {user?.name}</span>
            <SignOut className="w-full md:w-auto text-black" />
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <SignIn className="w-full md:w-auto bg-neutral-300 text-black hover:bg-neutral-500" provider="google" />
            <SignIn className="w-full md:w-auto bg-neutral-300 text-black hover:bg-neutral-500" provider="github" />
          </div>
        )}
      </div>
    </nav>
  );
}