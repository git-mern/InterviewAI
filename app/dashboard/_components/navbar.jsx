"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  { link: "/dashboard", title: "Dashboard", path: "/dashboard" },
  {
    link: "/dashboard/interview",
    title: "Interviews",
    path: "/dashboard/interview",
  },
  { link: "/contact", title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="flex py-2 px-6 items-center justify-between shadow-md border-t-2 border-neutral-300 shadow-neutral-500 my-4 mx-8 rounded-full">
      <Link href="/" className="text-red-500 font-bold text-xl">
        InterviewAI
      </Link>
      <div className="flex gap-2 items-center">
        {links.map((links, index) => (
          <div key={index} className="md:flex gap-4 hidden ">
            <Link
              href={links.link}
              className={`hover:text-black cursor-pointer transition ease-in-out p-1 ${
                path == links.path && "bg-slate-300 py-0.5 rounded-md px-1"
              }`}>
              {links.title}
            </Link>
          </div>
        ))}
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
