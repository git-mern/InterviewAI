"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex py-2 px-6 items-center justify-between bg--500 shadow-sm border-t-2 border-neutral-300 shadow-neutral-500 my-4 mx-8 rounded-full backdrop-blur-md">
      <Link href="/" className="text-red-500 font-bold text-xl">
        InterviewAI
      </Link>
      <div>
        <div className="md:flex gap-4 hidden ">
          <Link
            href="/dashboard"
            className={`hover:text-black cursor-pointer transition ease-in-out py-0.5 px-1 ${
              path == "/dashboard" && "bg-slate-300 py-0.5 rounded-md px-1"
            }`}>
            Dashboard
          </Link>
          <Link
            href="/dashboard/interview"
            className={`hover:text-black cursor-pointer transition-all py-0.5 px-1  ${
              path == `/dashboard/interview` &&
              " bg-slate-300 py-0.5 px-1 rounded-md text-black"
            }`}>
            Interviews
          </Link>
          <Link
            href="/contact"
            className={`hover:text-black cursor-pointer transition-all py-0.5 px-1  ${
              path == "/contact" && "bg-slate-300 py-0.5 px-1 rounded-md"
            }`}>
            Contact
          </Link>
        </div>
      </div>
      <SignedOut>
        <Button
          onClick={() => router.push("/sign-in")}
          variant="outline"
          className="font-semibold">
          Login
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Navbar;
