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
      <button className="relative bg-surface p-2 rounded-3xl flex gap-4 items-center w-20 h-10">
        {/* Sliding Circle */}
        <span
          onClick={toggleTheme}
          className={`absolute top-1 left-1 w-8 h-8 rounded-3xl transition-all duration-500  backdrop-blur-10xl ${
            theme === "light" ? "translate-x-10 bg-[#f9f9f9]"  : "translate-x-0 bg-[#121212]"
          }  backdrop-brightness-105 opacity-180 shadow-md cursor-pointer z-1`}
        ></span>

        {/* Sun */}
        <span>
          <Sun color={theme === "dark" ? "#999" : "#fcd34d"} className="animate-spin z-0"/>
        </span>

        {/* Moon */}
        <span>
          <Moon color={theme === "light" ? "#999" : "white"}   className="animate-pulse z-0" />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
