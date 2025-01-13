"use client";

import React, { useState } from "react";
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
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const InterviewAdd = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState();
  const [role, setRole] = useState();
  const [exp, setExp] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const user = useUser();

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(desc, role, exp);

      const prompt =
        "Job Position: " +
        role +
        ", Job Description: " +
        desc +
        ", Years of experience:  " +
        exp +
        ", Depends on Job Position, Job Description and Years of experience give us 5 interview question with answers in JSON format ";

      const result = await chatSession.sendMessage(prompt);
      const newresponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", " ");
      console.log(JSON.parse(newresponse));
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
            createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: Interview.mockId });

        console.log("id:", dbresponse);

        if (dbresponse) {
          setOpen(false);
          router.push(`/dashboard/interview/${dbresponse[0]?.mockId}`);
        }
      } else {
        console.log("something wrong");
      }
    } catch (error) {
      console.log("something wrong ", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg hover:scale-105 cursor-pointer hover:shadow-md transition-all"
        onClick={() => setOpen(true)}>
        <p className="font-semibold text-center ">Create new</p>
      </div>

      <Dialog open={open}>
        <DialogContent className="max-w-2xl ">
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogTitle className="text-md">
              Add more about exp, roles and skills
            </DialogTitle>
            <form onSubmit={onSubmit}>
              <div className="gap-2 my-3">
                <DialogDescription>
                  <label htmlFor="">Job Role*</label>
                  <Input
                    placeholder="Ex. Software Engineer"
                    required
                    onChange={(event) => setRole(event.target.value)}
                  />
                </DialogDescription>
              </div>
              <div className="gap-2 my-3">
                <DialogDescription>
                  <label htmlFor="">Job Description/Tech stack*</label>
                  <Textarea
                    placeholder="Ex. Nextjs, Reactjs"
                    required
                    onChange={(event) => setDesc(event.target.value)}
                  />
                </DialogDescription>
              </div>
              <div className="gap-2 my-3">
                <DialogDescription>
                  <label htmlFor="">Job Experience*</label>
                  <Input
                    placeholder="Ex. 1"
                    type="number"
                    required
                    onChange={(event) => setExp(event.target.value)}
                  />
                </DialogDescription>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="destructive"
                  className="mt-2"
                  type="button">
                  cancle
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewAdd;
