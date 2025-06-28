"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/gemini-ai-moddel";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";
import Link from "next/link";

const InterviewAdd = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState();
  const [role, setRole] = useState();
  const [exp, setExp] = useState();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const [interviewLimitReached, setInterviewLimitReached] = useState(false);

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const fetchInterviewCount = async () => {
      if (user?.user?.primaryEmailAddress?.emailAddress) {
        const count = await db
          .select()
          .from(Interview)
          .where(
            eq(Interview.createdBy, user.user.primaryEmailAddress.emailAddress)
          );

        if (count.length >= 5) {
          setInterviewLimitReached(true);
        }
      }
    };

    fetchInterviewCount();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (interviewLimitReached) return;
    try {
      setLoading(true);

      // console.log(desc, role, exp);

      const prompt =
        "Job Position: " +
        role +
        ", Job Description: " +
        desc +
        ", Years of experience:  " +
        exp +
        ", Depends on Job Position, Job Description and Years of experience give us" +
        question +
        "interview question with answers in JSON format ";

      const result = await chatSession.sendMessage(prompt);
      const newresponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", " ");
      // console.log(JSON.parse(newresponse));
      setJsonResponse(newresponse);

      if (newresponse) {
        const dbresponse = await db
          .insert(Interview)
          .values({
            mockId: uuidv4(),
            jsonMockResponse: newresponse,
            jobPosition: role,
            jobDescription: desc,
            jobExp: exp,
            createdBy: user?.user?.primaryEmailAddress?.emailAddress,

            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: Interview.mockId });

        // console.log("id:", dbresponse);

        if (dbresponse) {
          setOpen(false);
          router.push(`/dashboard/interview/${dbresponse[0]?.mockId}`);
        }
      } else {
        // console.log("something wrong");
      }
    } catch (error) {
      // console.log("something wrong ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="w-full max-w-md mx-auto sm:max-w-xs bg-neutral-200 px-6 sm:px-4 py-6 sm:py-4 border rounded-lg hover:scale-105 cursor-pointer hover:shadow-md transition-all flex justify-center items-center"
            onClick={() => {
              if (!interviewLimitReached) setOpen(true);
            }}>
            <div className="font-semibold flex items-center text-base md:text-lg sm:text-base">
              {interviewLimitReached ? (
                <>
                  <p className="text-red-700">Limit Reached</p>
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
                  Create new
                </>
              )}
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="">
          <DialogHeader>
            <DialogTitle></DialogTitle>

            {interviewLimitReached ? (
              <>
                <DialogTitle className="flex justify-center items-center text-amber-500 mb-5 text-2xl">
                  <Link
                    href={"/pricing"}
                    className="px-3 py-1 border rounded-md border-neutral-500 transition ease-in-out hover:bg-black/10
                    ">
                    Upgrade
                  </Link>
                </DialogTitle>
                <p className="text-red-500 mt-4 text-center">
                  You have reached the maximum of 5 interviews. Please Upgrade
                  to continue.
                </p>
              </>
            ) : (
              <>
                <DialogTitle>Interview Details</DialogTitle>
                <DialogTitle className="text-md">
                  Add more about exp, roles and skills
                </DialogTitle>
                <form onSubmit={onSubmit}>
                  <div className="my-2">
                    <DialogDescription>
                      <label htmlFor="" className="text-black">
                        Job Role*
                      </label>
                      <Input
                        placeholder="Ex. Software Engineer"
                        className="my-1"
                        required
                        onChange={(event) => setRole(event.target.value)}
                      />
                    </DialogDescription>
                  </div>
                  <div className="gap-2 my-3">
                    <DialogDescription>
                      <label htmlFor="" className="text-black">
                        Job Description/Tech stack*
                      </label>
                      <Textarea
                        className="my-1"
                        placeholder="Ex. Nextjs, Reactjs"
                        required
                        onChange={(event) => setDesc(event.target.value)}
                      />
                    </DialogDescription>
                  </div>
                  <div className="gap-2 my-3">
                    <DialogDescription>
                      <label htmlFor="" className="text-black">
                        Job Experience*
                      </label>
                      <Input
                        className="my-1"
                        placeholder="Ex. 1"
                        type="number"
                        required
                        onChange={(event) => setExp(event.target.value)}
                      />
                    </DialogDescription>
                  </div>
                  <div className="gap-2 my-3 ">
                    <DialogDescription>
                      <label htmlFor="" className="text-black">
                        No of Question{" "}
                      </label>
                      <label className="text-muted-foreground text-xs font-bold">
                        ( min: 1, max: 10 )*
                      </label>
                      <Input
                        className="my-1"
                        placeholder="Ex. 5/10"
                        type="number"
                        required
                        min="1"
                        max="10"
                        value={question}
                        onChange={(event) => {
                          const value = event.target.value;
                          if (value === "") {
                            setQuestion("");
                          } else {
                            let numValue = Number(value);
                            if (numValue > 10) numValue = 10;
                            if (numValue < 1) numValue = 1;
                            setQuestion(numValue);
                          }
                        }}
                        onBlur={() => {
                          if (question === "") {
                            setQuestion(1);
                          }
                        }}
                      />
                      ;
                    </DialogDescription>
                  </div>
                  <DialogFooter className="gap-2">
                    <Button
                      onClick={() => setOpen(false)}
                      variant="destructive"
                      className="mt-2"
                      type="button">
                      Cancel
                    </Button>
                    <Button className="mt-2" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Generating....
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewAdd;
