import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply class to <html>
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative group">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
      
      {/* Main toggle container */}
      <button 
        onClick={toggleTheme}
        className="relative bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full flex items-center w-16 h-9 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/50 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer"
      >
        {/* Sliding background with enhanced styling */}
        <span
          className={`absolute top-0.5 w-7 h-7 rounded-full transition-all duration-500 transform ${
            theme === "light" 
              ? "translate-x-6 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/25" 
              : "translate-x-[-2PX] bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-purple-500/25"
          } `}
        >
          {/* Inner glow effect */}
          <div className={`absolute inset-0 rounded-full ${
            theme === "light" 
              ? "bg-gradient-to-br from-yellow-300 to-orange-400" 
              : "bg-gradient-to-br from-indigo-500 to-purple-600"
          } opacity-80`}></div>
        
        </span>

        {/* Sun icon with enhanced styling */}
        <div className="flex items-center justify-center w-7 h-7 z-10">
          <Sun 
            size={18} 
            className={`transition-all duration-300 ${
              theme === "light" 
                ? "text-gray-400 scale-75" 
                : "text-yellow-500 scale-100 drop-shadow-sm"
            }`}
          />
        </div>

        {/* Moon icon with enhanced styling */}
        <div className="flex items-center justify-center w-7 h-7 z-10">
          <Moon 
            size={18} 
            className={`transition-all duration-300 ${
              theme === "dark" 
                ? "text-gray-400 scale-75" 
                : "text-indigo-600 scale-100 drop-shadow-sm"
            }`}
          />
        </div>

        {/* Floating particles around toggle */}
        <div className="absolute -top-1 -left-1 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-100"></div>
        <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-300"></div>
        <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-500"></div>
      </button>

      {/* Tooltip
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
      </div> */}
    </div>
  );
};

export default ThemeToggle;