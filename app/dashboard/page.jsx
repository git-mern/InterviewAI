import React from "react";
import InterviewAdd from "./_components/interviewadd";
import InterviewList from "./_components/interviewList";

const Dashboard = () => {
  return (
    <div className="p-8 ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-xl">Dashboard</h1>
        <h1>Create your Interview with best AI</h1>
      </div>
      <div className="flex justify-center items-center my-5">
        <InterviewAdd />
      </div>
    </div>
  );
};

export default Dashboard;
