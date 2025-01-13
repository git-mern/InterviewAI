"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FeedbackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        // setInterviewId(resolvedParams.interviewId);
        // console.log(resolvedParams.interviewId);
        getFeedback(resolvedParams.interviewId);
      } catch (error) {
        console.error("Error unwrapping params:", error);
      }
    };

    unwrapParams();
  }, [params]);

  const getFeedback = async (id) => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, id))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  return (
    <div className="p-10 bg--400">
      <h1 className="font-semibold text-xl text-green-500">Congratulations!</h1>
      <h2 className="font-semibold text-base">Your Interview Feedback.</h2>
      <h2 className="text-primary text-sm my-3">
        Your Overall Rating: <strong>7/10</strong>
      </h2>

      <h2 className="text-sm text-muted-foreground">
        Find below interview questions with correct Answer, Your Answer and
        Feedback for improvement.
      </h2>

      {feedbackList &&
        feedbackList.map((item, index) => (
          <div key={index}>
            <Collapsible className="mt-10">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-md my-4 text-left flex justify-between gap-7 w-full">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="p-2 border rounded-md text-red-700">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-md text-sm text-red-700">
                    <strong>Your answer:</strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-md text-sm text-green-800">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-md text-sm mb-4 text-blue-500">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}

      <Button onClick={() => router.replace("/dashboard")}>Home</Button>
    </div>
  );
};

export default FeedbackPage;
