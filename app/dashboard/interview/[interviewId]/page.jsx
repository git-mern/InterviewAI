"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Loader2Icon, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

const InterviewIdPage = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setInterviewId(resolvedParams.interviewId);
        interviewDetails(resolvedParams.interviewId);
      } catch (error) {
        console.error("Error unwrapping params:", error);
      }
    };

    unwrapParams();
  }, [params]);

  const interviewDetails = async (id) => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockId, id));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10 px-5 md:px-10">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-6">
        Let's Get Started
      </motion.h2>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-600">
            <Loader2Icon className="animate-spin h-6 w-6 mr-2" />
            Loading...
          </div>
        ) : (
          interviewData && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 p-4 rounded-lg border border-gray-300 bg-gray-50">
              <h2 className="text-lg font-semibold">
                Job Role: {interviewData.jobPosition}
              </h2>
              <p className="text-gray-700">
                Tech Stack: {interviewData.jobDescription}
              </p>
              <p className="text-gray-700">
                Experience Required: {interviewData.jobExp}
              </p>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                <h2 className="flex gap-2 items-center font-semibold text-yellow-700">
                  <Lightbulb className="h-5 w-5" /> Information
                </h2>
                <p className="text-sm text-gray-700 mt-2">
                  Enable your camera and microphone to start the interview. You
                  will be asked a set of questions, and at the end, you'll
                  receive a detailed report based on your responses.
                </p>
              </div>
            </motion.div>
          )
        )}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 bg-gray-100 p-6 rounded-lg shadow-inner">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => console.log("Webcam started")}
              onUserMediaError={() => setWebcamEnabled(false)}
              className="rounded-lg border border-gray-300"
              style={{ width: 320, height: 240 }}
              mirrored
            />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <WebcamIcon className="h-24 w-24 text-gray-500" />
              <Button
                variant="outline"
                onClick={() => setWebcamEnabled(true)}
                className="border border-gray-400 text-gray-700 hover:bg-gray-200">
                Enable Camera & Microphone
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
      {interviewId && (
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md shadow-md">
            Start Interview
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
};

export default InterviewIdPage;
