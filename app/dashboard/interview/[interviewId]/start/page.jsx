"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsPage from "./_components/Questions";
import AnswersPage from "./_components/Answers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

const StartInterviewPage = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestion, setInterviewQuestion] = useState();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const resolvedParams = await params;
        // setInterviewId(resolvedParams.interviewId);
        //  console.log(resolvedParams.interviewId);
        interviewDetails(resolvedParams.interviewId);
      } catch (error) {
        //  console.error("Error unwrapping params:", error);
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

      const jsonRes = JSON.parse(result[0].jsonMockResponse);
      // console.log(jsonRes);
      setInterviewQuestion(jsonRes);
      setInterviewData(result[0]);
    } catch (error) {
      // console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <h2 className="flex justify-center items-center gap-2">
            <Loader2Icon className="animate-spin" />
            Loading...
          </h2>
        ) : (
          <QuestionsPage
            interviewQuestion={interviewQuestion}
            active={active}
          />
        )}
        <AnswersPage
          interviewQuestion={interviewQuestion}
          active={active}
          interviewData={interviewData}
        />
      </div>

      <div className="gap-3 flex justify-end items-center mb-5">
        {active > 0 && (
          <Button onClick={() => setActive(active - 1)} variant="outline">
            Previous
          </Button>
        )}

        {active != interviewQuestion?.length - 1 && (
          <Button onClick={() => setActive(active + 1)} variant="outline">
            Next
          </Button>
        )}

        {active == interviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button variant="destructive">End</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewPage;
