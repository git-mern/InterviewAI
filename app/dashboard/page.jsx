"use client";

import React from "react";
import InterviewAdd from "./_components/interviewadd";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="p-8 rounded-md">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <header className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            Dashboard
          </motion.h1>
          <motion.p
            className="text-xl "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}>
            Create your Interview with the best AI
          </motion.p>
        </header>

        <motion.div
          className=" p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          <InterviewAdd />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
