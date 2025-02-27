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
import { Progress } from "@/components/ui/progress";

const StartInterviewPage = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestion, setInterviewQuestion] = useState();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const resolvedParams = await params;
        interviewDetails(resolvedParams.interviewId);
      } catch (error) {}
    };

    fetchInterviewDetails();
  }, [params]);

  const interviewDetails = async (id) => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockId, id));
      const jsonRes = JSON.parse(result[0].jsonMockResponse);
      setInterviewQuestion(jsonRes);
      setInterviewData(result[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center text-xl font-semibold">Mock Interview</div>

      <Progress value={(active / (interviewQuestion?.length - 1)) * 100} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="flex justify-center items-center gap-2 text-lg">
            <Loader2Icon className="animate-spin" /> Loading...
          </div>
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

      <div className="flex justify-between items-center mt-6">
        <Button
          disabled={active === 0}
          onClick={() => setActive(active - 1)}
          variant="outline">
          Previous
        </Button>
        <span className="text-muted-foreground">
          {active + 1} / {interviewQuestion?.length}
        </span>
        {active !== interviewQuestion?.length - 1 ? (
          <Button onClick={() => setActive(active + 1)} variant="outline">
            Next
          </Button>
        ) : (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button variant="destructive">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewPage;
