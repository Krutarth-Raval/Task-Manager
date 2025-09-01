import React from "react";
import ThemeToggle from "../UI/ThemeToggle";
import HeroInvite from "../UI/HeroInvite";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-surface w-full h-[100svh]  ">
      <div className="">
        <div className="flex bg-color p-2 justify-between items-center">
          <p className="title-font-size font-bold font-bg-primary text-color-primary">
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
