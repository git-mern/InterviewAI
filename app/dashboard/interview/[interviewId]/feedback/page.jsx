"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const FeedbackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
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
    </div>
  );
};

export default FeedbackPage;
