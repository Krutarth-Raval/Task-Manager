import React from "react";
import ThemeToggle from "../UI/ThemeToggle";
import HeroInvite from "../UI/HeroInvite";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-surface w-full h-[100svh] py-2 sm:px-5 p-3">
      <div className="">
        <div className="flex bg-color p-2 rounded-xl justify-between items-center">
          <p className="title-font-size font-bold font-bg-primary">
            {" "}
            Task Manager
          </p>
          <ThemeToggle />
        </div>
        <div>
          <HeroInvite />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
