import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-[100svh] flex flex-col">
      {/* Top Navbar (always shown) */}
      <Navbar activeMenu={activeMenu} />

      {/* If user exists, show sidebar + content */}
      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (shown only on lg screens via SideMenu's logic) */}
          <SideMenu activeMenu={activeMenu} />

          {/* Main Content Area - SOLUTION 2: Max width constraint */}
          <div className="flex-1 h-full overflow-y-auto px-2 py-2">
            <div className="w-full max-w-6xl mx-auto">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardLayout;
