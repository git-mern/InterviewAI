import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col my-5 ">
      <h1 className="mb-5 text-xl font-semibold">Welcome to InterviewAI</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
