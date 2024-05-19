import React from "react";
import { auth } from "@/auth";
import { SignIn, SignOut } from "./sign-in";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import { Button } from './ui/button';

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-zinc-600 text-white">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Student Stay
        </Link>
        {session ? (
          <div className="flex flex-row items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
              <Avatar className="border-2 border-white">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback>{user?.name!}</AvatarFallback>
              </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href= "/profile">
                    <Button>
                      Profile
                    </Button>
                  </Link>
                </DropdownMenuItem> 
                <DropdownMenuItem>
                  <SignOut className="w-full md:w-auto text-black" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <SignIn
              className="w-full md:w-auto bg-neutral-300 text-black hover:bg-neutral-500"
              provider="google"
            />
            {/* <SignIn className="w-full md:w-auto bg-neutral-300 text-black hover:bg-neutral-500" provider="github" /> */}
          </div>
        )}
      </div>
    </nav>
  );
}
