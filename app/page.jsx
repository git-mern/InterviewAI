import { Button } from "@/components/ui/button";
import Navbar from "./dashboard/_components/navbar";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Welcome To{" "}
          <span className="font-extrabold text-red-600 shadow-sm shadow-black dark:shadow-white p-0.5 rounded-md">
            InterviewAI
          </span>
        </h1>
        <p className="text-lg text-center mt-4">
          A Perfect Website to Practice your Mock Interviews.
        </p>
        <SignedIn>
          <div className="flex justify-center items-center gap-10 mt-10 px-4 text-center">
            <Link href="/dashboard">
              <Button variant="outline" className="border border-black">
                Dashboard
              </Button>
            </Link>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
