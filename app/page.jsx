import { Button } from "@/components/ui/button";
import Navbar from "./dashboard/_components/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Features from "@/components/features";
import Testimonial from "@/components/testimonial";
import { ArrowUp } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 mt-10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl" />
            <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
              Perfect Your
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200 ml-4">
                Interview Skills
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Master the art of interviewing with our AI-powered platform
              designed for your success.
            </p>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                  Launch Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </section>

        {/* Features Section */}
        <Features />
        {/* Testimonials Section */}
        <Testimonial />

        {/* CTA Section */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
              Join thousands of successful candidates who have mastered their
              interviews with our platform.
            </p>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                  Start Now
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button className="px-10 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                  Begin Your Journey
                </Button>
              </Link>
            </SignedOut>
          </div>
        </section>

        <div className="flex justify-end items-center my-2 py-2 mx-2">
          <Link href="/" className="bg-neutral-300 p-2 rounded-full">
            <ArrowUp />
          </Link>
        </div>
      </div>
    </div>
  );
}
