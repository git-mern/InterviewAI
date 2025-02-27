"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FeedbackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, resolvedParams.interviewId))
          .orderBy(UserAnswer.id);
        setFeedbackList(result);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [params]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      {loading ? (
        <div className="flex justify-center items-center text-lg font-semibold gap-2">
          <Loader2Icon className="animate-spin" /> Loading Feedback...
        </div>
      ) : feedbackList.length === 0 ? (
        <h2 className="text-center text-xl font-semibold text-gray-500">
          No Interview Feedback Available
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-green-600 text-center mb-4">
            Congratulations!
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Here's your interview feedback. Review your responses and suggested
            improvements.
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {feedbackList.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg p-4 shadow-sm">
                <AccordionTrigger className="text-base font-medium flex justify-between items-center">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="mt-3 space-y-2">
                  <p className="p-2 border rounded-md text-sm text-blue-500">
                    <strong>Rating:</strong> {item.rating}/10
                  </p>
                  <p className="p-2 border rounded-md text-sm text-red-700">
                    <strong>Your Answer:</strong> {item.userAns}
                  </p>
                  <p className="p-2 border rounded-md text-sm text-green-700">
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </p>
                  <p className="p-2 border rounded-md text-sm text-gray-700">
                    <strong>Feedback:</strong> {item.feedback}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
      <div className="flex justify-center mt-6">
        <Button onClick={() => router.replace("/dashboard")} variant="default">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default FeedbackPage;
