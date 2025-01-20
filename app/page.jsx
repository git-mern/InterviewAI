import { Button } from "@/components/ui/button";
import Navbar from "./dashboard/_components/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Features from "@/components/features";
import Testimonial from "@/components/testimonial";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20 mt-10 mx-2 rounded-md">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mock AI Interview Platform
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Practice your interview skills with AI-driven mock interviews.
            </p>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="px-8 py-3 text-lg">Join Now</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button className="px-8 py-3 text-lg">Join Now</Button>
              </Link>
            </SignedOut>
          </div>
        </section>

        {/* Features Section */}
        <Features />
        {/* Testimonials Section */}
        <Testimonial />
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20 mx-2 rounded-md">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Improve Your Interview Skills?
            </h2>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="px-8 py-3 text-lg">Join Now</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button className="px-8 py-3 text-lg">Join Now</Button>
              </Link>
            </SignedOut>
          </div>
        </section>
      </div>
    </div>
  );
}
