"use client";

import React from "react";
import InterviewAdd from "./_components/interviewadd";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="mt-10 flex justify-center items-center min-h-screen rounded-md px-4">
      <motion.div
        className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-10 border border-white/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {/* Header */}
        <header className="text-center mb-8">
          <motion.h1
            className="text-5xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            Dashboard
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}>
            Create your interview with the best AI experience
          </motion.p>
        </header>

        {/* Content Box */}
        <motion.div
          className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200"
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
