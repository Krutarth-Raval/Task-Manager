import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { AlignJustify, X } from "lucide-react";
import ThemeToggle from "../UI/ThemeToggle";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div>
      {/* Top Navbar */}
      <div className="flex bg-surface p-2 justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Hamburger for mobile only */}
          <button
            className="lg:hidden"
            aria-label="Toggle Side Menu"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-surface rounded-full color-text">
              {openSideMenu ? (
                <X size={22} strokeWidth={3} />
              ) : (
                <AlignJustify size={22} strokeWidth={3} />
              )}
            </div>
          </button>

          {/* Brand Title */}
          <p className="title-font-size font-bold font-bg-primary text-color-primary">
            Task Manager
          </p>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Backdrop on mobile */}
      {openSideMenu && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40 lg:hidden"
          onClick={() => setOpenSideMenu(false)}
        />
      )}

      {/* Always mounted mobile sidebar for animation */}
      <SideMenu
        activeMenu={activeMenu}
        isMobile={true}
        isOpen={openSideMenu}
      />
    </div>
  );
};

export default Navbar;
