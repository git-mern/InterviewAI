import React from "react";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
