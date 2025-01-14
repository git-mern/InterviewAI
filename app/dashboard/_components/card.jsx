import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Card = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };
  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };
  return (
    <div className="border shadow-sm rounded-md p-6 mt-6 ">
      <h2 className="font-semibold text-lg">{interview?.jobPosition}</h2>
      <p className="text-sm text-neutral-700">
        {interview?.jobExp} Years of Experience.
      </p>
      <h3 className="text-sm text-neutral-500">
        Created At: {interview?.createdAt}
      </h3>
      <div className="flex justify-between mt-2 gap-2">
        <Button
          onClick={onFeedback}
          variant="outline"
          className="w-full bg-neutral-100">
          Feedback
        </Button>
        <Button onClick={onStart} className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
};

export default Card;
