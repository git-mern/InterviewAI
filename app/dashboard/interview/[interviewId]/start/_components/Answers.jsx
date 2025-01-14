import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/gemini-ai-moddel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const AnswersPage = ({ interviewQuestion, active, interviewData }) => {
  const [answer, setAnswer] = useState(" ");
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && answer.length > 10) {
      UpdateUserAnswer();
    }
  }, [answer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    //console.log(answer);
    setloading(true);

    const feedbackPrompt =
      "Questin:" +
      interviewQuestion[active]?.question +
      ",User Answer:" +
      answer +
      ",Depends on question and User answer for given interview question" +
      "please give us rating for answer and feedback of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const feedbackJsonResponse = result.response
      .text()
      .replace("```json", " ")
      .replace("```", " ");

    const finalJsonFeedbackResp = JSON.parse(feedbackJsonResponse);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: interviewQuestion[active]?.question,
      correctAns: interviewQuestion[active]?.answer,
      userAns: answer,
      feedback: finalJsonFeedbackResp?.feedback,
      rating: finalJsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User Answer Recorded Successfully!");
      setAnswer("");
      setResults([]);
    }
    setResults([]);
    setloading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center roumd p-5 mt-16 rounded-md shadow-sm shadow-black">
        <WebcamIcon width={200} height={200} className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        onClick={startStopRecording}
        className="my-5">
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-1 items-center">
            <StopCircle />
            Stop Recording{" "}
          </h2>
        ) : (
          <h2 className="500 flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default AnswersPage;
