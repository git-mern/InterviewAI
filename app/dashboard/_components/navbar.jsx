"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex py-4 px-6 items-center justify-between bg--500 shadow-sm border-t-2 border-neutral-300 shadow-neutral-500 m-4 rounded-full backdrop-blur-md">
      <Link href="/dashboard" className="text-red-500 font-bold text-xl ">
        InterviewAI
      </Link>
      <div>
        <ul className="md:flex gap-4 hidden ">
          <Link
            href="/dashboard"
            className={`hover:text-black cursor-pointer transition-all hover:font-semibold ${
              path == "/dashboard" && "text-black font-semibold"
            }`}>
            Dashboard
          </Link>
          <li
            className={`hover:text-black cursor-pointer transition-all hover:font-semibold ${
              path == `/dashboard/interview` && "text-black font-semibold"
            }`}>
            Interview
          </li>
          <li
            className={`hover:text-black cursor-pointer transition-all hover:font-semibold ${
              path == "/dashboard/how" && "text-black font-semibold"
            }`}>
            How it works?
          </li>
          <li
            className={`hover:text-black cursor-pointer transition-all hover:font-semibold ${
              path == "/dashboard/contact" && "text-black font-semibold"
            }`}>
            Contact
          </li>
        </ul>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
