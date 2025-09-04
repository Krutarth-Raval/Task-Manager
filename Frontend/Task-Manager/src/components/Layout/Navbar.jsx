import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { AlignJustify, X, Shield, Sparkles } from "lucide-react";
import ThemeToggle from "../UI/ThemeToggle";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="fixed w-full z-40">
      {/* Animated background elements for navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles for navbar */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-2 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-4 left-1/3 w-0.5 h-0.5 bg-purple-400/50 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-2 left-1/4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Enhanced Top Navbar */}
      <div className="relative z-10">
        {/* Header glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-pink-500/8 backdrop-blur-xl"></div>

        <div className="relative flex bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-lg p-3 lg:p-4 justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Enhanced Hamburger for mobile */}
            <button
              className="lg:hidden group relative"
              aria-label="Toggle Side Menu"
              onClick={() => setOpenSideMenu(!openSideMenu)}
            >
              {/* Glow effect behind hamburger */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md border border-gray-200/50 dark:border-gray-600/50 group-hover:shadow-lg transition-all duration-300">
                {openSideMenu ? (
                  <X
                    size={20}
                    strokeWidth={2.5}
                    className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                  />
                ) : (
                  <AlignJustify
                    size={20}
                    strokeWidth={2.5}
                    className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                  />
                )}
              </div>
            </button>

            {/* Enhanced Brand Section */}
            <div className="flex items-center gap-3">
              {/* Animated logo icon */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Enhanced title with subtitle */}
              <div className="space-y-0.5">
                <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Task Manager
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Workspace
                  </span>
                  <Sparkles className="w-3 h-3 text-purple-500/70 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Theme Toggle Section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Enhanced Backdrop on mobile */}
      {openSideMenu && (
        <div
          
          onClick={() => setOpenSideMenu(false)}
        />
      )}
      <div className="fixed top-20 h-[100dvh]">
        {/* Always mounted mobile sidebar for animation */}
        <SideMenu
          activeMenu={activeMenu}
          isMobile={true}
          isOpen={openSideMenu}
        />
      </div>
    </div>
  );
};

export default Navbar;
