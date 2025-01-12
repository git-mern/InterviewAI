import React from "react";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="mx-5 md:mx-18 lg:mx-32">{children}</div>
    </div>
  );
};

export default DashboardLayout;
