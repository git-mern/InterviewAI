import React from "react";
import InterviewAdd from "./_components/interviewadd";
import InterviewList from "./_components/interviewList";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="font-semibold text-xl">Dashboard</h1>
      <h1>Create your Interview with best AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 my-5">
        <InterviewAdd />
      </div>
      <InterviewList />
    </div>
  );
};

export default Dashboard;
