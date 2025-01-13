"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await db
      .select()
      .from(Interview)
      .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Interview.id));

    console.log(result);
    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="font-semibold text-xl mt-10">Previous Interviews</h2>
      <p className="text-muted-foreground">Your previous given interviews.</p>
    </div>
  );
};

export default InterviewList;
