import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../_Context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden gap-3">
      {/* Top Navbar - Fixed */}
      <Navbar activeMenu={activeMenu} />

      {/* If user exists, show sidebar + content */}
      {user && (
        <div className="flex flex-1 relative overflow-hidden">
          {/* Desktop Sidebar - Fixed position, takes up layout space */}
          <div className="hidden lg:block flex-shrink-0 w-64">
            <div className="fixed top-20 left-0 w-70 h-[calc(100vh-5rem)] overflow-hidden">
              <SideMenu activeMenu={activeMenu} isMobile={false} />
            </div>
          </div>

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto mt-20">
            <div className="px-4 py-4 min-h-full">
              <div className="w-full max-w-6xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;