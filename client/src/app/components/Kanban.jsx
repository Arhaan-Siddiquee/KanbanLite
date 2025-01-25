
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MoreVertical } from "lucide-react";

const Kanban = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold group-hover:text-yellow-400 transition">
          Task Title
        </h3>
        <button className="text-gray-300 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Task Description */}
      <p className="text-sm text-gray-300 group-hover:text-gray-100 transition">
        This is a description of the task. Keep it concise and clear to ensure
        readability.
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-gray-400">50%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-400" size={20} />
          <span className="text-sm text-gray-300 group-hover:text-gray-100 transition">
            In Progress
          </span>
        </div>
        <button className="bg-yellow-400 text-gray-900 py-1 px-4 rounded-lg text-sm font-bold shadow-md hover:bg-yellow-300 transition">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default Kanban;
