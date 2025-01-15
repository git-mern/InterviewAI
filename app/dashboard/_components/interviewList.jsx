"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { Loader2Icon } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true);
    try {
      // const emailAddress = user?.primaryEmailAddress?.emailAddress;
      // console.log("Fetching interviews for email:", emailAddress);
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Interview.id));

      // console.log(result);
      setInterviewList(result);
    } catch (error) {
      //console.error("Failed to fetch interview list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="font-semibold text-3xl mt-10">Previous Interviews</h2>
      <p className="text-muted-foreground text-lg">
        Your previous given interviews.
      </p>
      {loading ? (
        <p className="flex gap-2 justify-center items-center h-36">
          <Loader2Icon className="animate-spin" /> Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interviewList.map((interview, index) => (
            <Card interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
