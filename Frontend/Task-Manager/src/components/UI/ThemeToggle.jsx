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
    <div>
      <button className="relative bg-color p-2 rounded-3xl flex gap-3 items-center w-16 h-8">
        {/* Sliding Circle */}
        <span
          onClick={toggleTheme}
          className={`absolute top-1 left-1 w-6 h-6 rounded-3xl transition-all duration-500  backdrop-blur-10xl ${
            theme === "light" ? "translate-x-8 bg-[#888]"  : "translate-x-0 bg-[#888]"
          }  backdrop-brightness-105 opacity-180 shadow-md cursor-pointer z-1`}
        ></span>

        {/* Sun */}
        <span>
          <Sun size={20} color={theme === "dark" ? "#999" : "#fcd34d"} className="animate-spin z-0"/>
        </span>

        {/* Moon */}
        <span>
          <Moon size={20} color={theme === "light" ? "#999" : "white"}   className="animate-pulse z-0" />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
