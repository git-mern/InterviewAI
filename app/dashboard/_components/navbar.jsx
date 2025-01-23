"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

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
    <div className="flex py-2 px-6 items-center justify-between shadow-md border-t-2 border-neutral-300 shadow-neutral-500 my-4 mx-8 rounded-xl">
      <Link href="/" className="text-red-500 font-bold text-xl">
        InterviewAI
      </Link>
      <nav className="flex gap-2 items-center">
        {links.map((link, index) => (
          <div
            key={index}
            className="md:block hidden relative hover:scale-105 transition-all">
            <Link
              href={link.link}
              className={`relative px-3 py-2 rounded-md transition-colors duration-200 ease-in-out ${
                path === link.path
                  ? "text-black font-bold"
                  : "text-gray-900 hover:text-black"
              }`}>
              <span className="relative z-10">{link.title}</span>
              {path === link.path && (
                <motion.div
                  className="absolute inset-0 bg-neutral-400 rounded-md"
                  layoutId="background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </div>
        ))}
      </nav>
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
