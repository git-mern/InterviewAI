"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewIdPage = ({ params }) => {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        setInterviewId(resolvedParams.interviewId);
        console.log(resolvedParams.interviewId);
        interviewDetails(resolvedParams.interviewId);
      } catch (error) {
        console.error("Error unwrapping params:", error);
      }
    };

    unwrapParams();
  }, [params]);

  const interviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockId, id));
      console.log(result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-2 flex justify-center items-center flex-col">
      <h2 className="font-semibold text-xl mt-5">Let's get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 bg--300 p-2 rounded-md shadow-sm shadow-black">
        {interviewData && (
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-5 p-5 rounded-md border">
              <h2 className="text-base">
                <span className="font-semibold">Job Role/job Position: </span>
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-base">
                <span className="font-semibold">
                  Job Description/Tech Stack:{" "}
                </span>{" "}
                {interviewData.jobDescription}
              </h2>
              <h2 className="text-base">
                <span className="font-semibold">
                  Job Experience/Tech Stack:{" "}
                </span>{" "}
                {interviewData.jobExp}
              </h2>
            </div>
            <div className="p-5 bg--400 border border-yellow-300 rounded-md">
              <h2 className="flex gap-2 items-center">
                <Lightbulb />
                <span className="font-semibold">Information</span>
              </h2>
              <p className="p-2 mb-4 md:mb-0">
                Enable video Cam and Microphone to start your interview, It has
                a set of Questions which you can answer and at last you will get
                the report on the basis of your answer
              </p>
            </div>
          </div>
        )}
        <div className=" flex justify-center flex-col items-center bg--300 mx-0 md:mx-2 mt-2 md:mt-0 rounded-md shadow-sm shadow-neutral-400">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => console.log("Webcam started")}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{ height: 300, width: 300 }}
              mirrored={true}
            />
          ) : (
            <>
              <WebcamIcon className="h-56 w-56 p-16 bg-secondary rounded-md border" />
              <Button
                variant="outline"
                onClick={() => setWebcamEnabled(true)}
                className="w-fit flex mt-5 border-2 border-neutral-400 mb-2">
                Enable Camera and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <Button className="mb-5">Start Interview</Button>
    </div>
  );
};

export default InterviewIdPage;
