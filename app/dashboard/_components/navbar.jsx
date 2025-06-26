"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const links = [
  { link: "/dashboard", title: "Dashboard" },
  { link: "/dashboard/interview", title: "Interviews" },
  { link: "/pricing", title: "Pricing" },
  { link: "/contact", title: "Contact" },
];

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <div className="mx-4 mt-4 z-50 bg-gray-200 backdrop-blur-lg shadow-lg border-b border-gray-300 rounded-lg">
      <div className="flex items-center justify-between py-3 px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="flex justify-center items-center gap-2 text-base md:text-2xl font-extrabold text-transparent bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text">
          <Image
            src="/logo.png"
            alt="logo"
            width={25}
            height={25}
            className="rounded-md"
          />
          InterviewAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1   items-center">
          {links.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="relative">
              <Link
                href={link.link}
                className={`relative px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  path === link.link
                    ? "text-black font-bold"
                    : "text-gray-700 hover:text-black"
                }`}>
                {link.title}
                {path === link.link && (
                  <motion.div
                    className="absolute inset-0 bg-neutral-400/50 rounded-md"
                    layoutId="background"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Side: Login + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Auth Buttons */}
          <SignedOut>
            <Button
              onClick={() => router.push("/sign-in")}
              variant="outline"
              className="font-semibold px-4 py-2 border-gray-500 hover:border-black">
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="top-full left-0 w-full bg-neutral-200 shadow-lg rounded-lg p-6 flex flex-col justify-center items-center gap-4 md:hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className={`block w-fit px-6 text-lg font-medium transition-all ${
                  path === link.link
                    ? "text-black font-bold"
                    : "text-gray-700 hover:text-black"
                }`}>
                {link.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
