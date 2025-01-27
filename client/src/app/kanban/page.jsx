"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar as CalendarIcon, User, List, Target, Star, X, Sun, Moon, Palette, ChevronDown } from "lucide-react";

const themes = {
  light: {
    background: "bg-gray-100",
    card: "from-white to-gray-100",
    text: "text-gray-900",
    subtext: "text-gray-600",
    accent: "bg-blue-500",
    border: "border-gray-200",
    hover: "hover:bg-gray-50",
  },
  dark: {
    background: "bg-gray-900",
    card: "from-gray-800 to-gray-900",
    text: "text-white",
    subtext: "text-gray-300",
    accent: "bg-blue-600",
    border: "border-gray-700",
    hover: "hover:bg-gray-800",
  },
  blackBlue: {
    background: "bg-black",
    card: "from-blue-900 to-gray-900",
    text: "text-white",
    subtext: "text-blue-200",
    accent: "bg-blue-500",
    border: "border-blue-900",
    hover: "hover:bg-blue-900",
  },
  whiteBlue: {
    background: "bg-white",
    card: "from-blue-50 to-white",
    text: "text-blue-900",
    subtext: "text-blue-600",
    accent: "bg-blue-500",
    border: "border-blue-100",
    hover: "hover:bg-blue-50",
  },
};

const ThemeDropdown = ({ currentTheme, setCurrentTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg flex items-center gap-2 ${theme.card} border ${theme.border}`}
      >
        <Palette className={`w-4 h-4 ${theme.text}`} />
        <ChevronDown className={`w-4 h-4 ${theme.text}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-40 ${theme.card} rounded-lg shadow-lg border ${theme.border} py-1`}>
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              onClick={() => {
                setCurrentTheme(themeName);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 ${theme.hover} ${theme.text}`}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const BentoBox = ({ children, className = "", theme, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
    className={`bg-gradient-to-br ${theme.card} p-6 rounded-2xl border ${theme.border} shadow-lg backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.div>
);

const CalendarGrid = ({ theme }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendar = Array(42).fill(null);
  dates.forEach((date, i) => {
    calendar[startingDay + i] = date;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className={`text-center text-sm font-medium ${theme.subtext}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendar.map((date, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded-lg 
              ${date === currentDate.getDate() ? `${theme.accent} ${theme.text}` : ''}
              ${date ? theme.hover : ''} 
              ${theme.text} text-sm cursor-pointer transition-colors`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

const Kanban = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen ${theme.background} p-6 transition-colors duration-300`}>
      {/* Theme Switcher */}
        <div className="fixed top-4 right-4">
          <ThemeDropdown currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} theme={theme} />
        </div>

      <div className="max-w-8xl mx-auto grid grid-cols-12 gap-6 pt-16">
        {/* Left Column */}
        <div className="col-span-3 space-y-6">
          <BentoBox theme={theme} delay={0.1} className="h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              <User className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto" />
              <div className="text-center">
                <h3 className={`text-lg font-bold ${theme.text}`}>John Doe</h3>
                <p className={theme.subtext}>Product Manager</p>
              </div>
            </div>
          </BentoBox>
        </div>

        {/* Middle Column */}
        <div className="col-span-6 space-y-6">
          <BentoBox theme={theme} delay={0.2} className="h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Calendar</h2>
            </div>
            <CalendarGrid theme={theme} />
          </BentoBox>
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-6">
          <BentoBox theme={theme} delay={0.3} className="h-[192px]">
            <div className="flex items-center gap-3 mb-4">
              <Target className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Goals</h2>
            </div>
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${theme.hover}`}>
                <div className="flex justify-between mb-2">
                  <span className={theme.text}>Q1 Progress</span>
                  <span className={theme.subtext}>75%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div className={`h-full rounded-full ${theme.accent} w-3/4`} />
                </div>
              </div>
            </div>
          </BentoBox>

          <BentoBox theme={theme} delay={0.4} className="h-[192px]">
            <div className="flex items-center gap-3 mb-4">
              <Star className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Highlights</h2>
            </div>
            <div className={`p-3 rounded-lg ${theme.hover}`}>
              <p className={theme.text}>Project Launch</p>
              <p className={theme.subtext}>Due Friday</p>
            </div>
          </BentoBox>
        </div>

        {/* Bottom Row */}
        <div className="col-span-4">
          <BentoBox theme={theme} delay={0.5}>
            <div className="flex items-center gap-3 mb-4">
              <List className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Todo</h2>
            </div>
            <div className="space-y-3">
              {['Review designs', 'Team meeting', 'Project planning'].map((task, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${theme.hover}`}>
                  <CheckCircle className={`${theme.accent} bg-clip-text`} />
                  <span className={theme.text}>{task}</span>
                </div>
              ))}
            </div>
          </BentoBox>
        </div>

        <div className="col-span-4">
          <BentoBox theme={theme} delay={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Completed</h2>
            </div>
            <div className="text-center">
              <p className={`text-4xl font-bold ${theme.text}`}>12</p>
              <p className={theme.subtext}>Tasks this week</p>
            </div>
          </BentoBox>
        </div>

        <div className="col-span-4">
          <BentoBox theme={theme} delay={0.7}>
            <div className="flex items-center gap-3 mb-4">
              <X className={theme.text} />
              <h2 className={`text-xl font-bold ${theme.text}`}>Pending</h2>
            </div>
            <div className="text-center">
              <p className={`text-4xl font-bold ${theme.text}`}>3</p>
              <p className={theme.subtext}>Tasks remaining</p>
            </div>
          </BentoBox>
        </div>
      </div>
    </div>
  );
};

export default Kanban;