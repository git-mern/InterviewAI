"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./dashboard/_components/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Features from "@/components/features";
import Testimonial from "@/components/testimonial";
import { ArrowUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { AnimatedGoToTop } from "@/components/gototop";

export default function Home() {
  return (
    <>
      <Head>
        <title>Interview Mastery - Perfect Your Skills</title>
        <meta
          name="description"
          content="Master the art of interviewing with our AI-powered platform designed to help you succeed."
        />
      </Head>
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 rounded-3xl" />
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}>
              <div className="absolute top-20 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl" />
              <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl" />
            </motion.div>

            <div className="relative container mx-auto px-4 text-center">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}>
                Perfect Your
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200 ml-4">
                  Interview Skills
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-12 text-gray-100 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                Master the art of interviewing with our AI-powered platform
                designed for your success.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-full">
                      Launch Dashboard <ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in">
                    <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-full hover:scale-105">
                      Get Started <ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </SignedOut>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <Features />

          {/* Testimonials Section */}
          <Testimonial />

          {/* CTA Section */}
          <section className="relative overflow-hidden py-24 rounded-3xl my-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90" />
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl" />
            </motion.div>

            <div className="relative container mx-auto px-4 text-center">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}>
                Ready to Transform Your Interview Skills?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                Join thousands of successful candidates who have mastered their
                interviews with our platform.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-full">
                      Start Now <ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in">
                    <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-full hover:scale-105">
                      Begin Your Journey <ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </SignedOut>
              </motion.div>
            </div>
          </section>

          <AnimatedGoToTop />
        </div>
      </div>
    </>
  );
}
