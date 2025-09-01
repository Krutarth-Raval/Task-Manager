import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

/**
 * SideMenu component - shows the sidebar menu for admin or user
 * - Responsive for mobile and desktop
 * - Smooth transition on mobile (slide in/out)
 */
const SideMenu = ({ activeMenu, isMobile = false, isOpen = true }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  // Navigate or log out based on item clicked
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  // Clear user and redirect to login on logout
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // Load correct sidebar menu based on user role
  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div
      className={`w-[250px] bg-surface p-2 flex flex-col gap-3 
        transition-all duration-300 ease-in-out 
        ${
          isMobile
            ? `fixed top-14 left-0 h-[100svh] z-50 overflow-y-auto shadow-lg ${
                isOpen ? "ml-0" : "-ml-[250px]"
              } lg:hidden`
            : "hidden lg:block h-full"
        }
      `}
    >
      {/* ✅ User Profile Section */}
      <div className="flex flex-col  items-start justify-center metadata-font-size py-3 px-2 gap-3 rounded-md  mb-3">
        <div className="flex items-center gap-3 justify-center ">
          <div className="w-18 h-18 rounded-full overflow-hidden border-2">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                No Image
              </div>
            )}
          </div>

          <div className="flex gap-1 flex-col ">
            <p className="font-semibold small-font-size uppercase text-left">
              {user?.name || ""}
            </p>
            {/* Admin badge */}
            {user?.role === "admin" && (
              <div className="font-bold rounded-md small-font-size text-theme  bg-secondary w-max px-1 ">
                Admin
              </div>
            )}
          
          </div>
        </div>  <p className="font-light small-font-size  text-color-light w-full bg-color p-1 rounded-md">
              {user?.email || ""}
            </p>
      </div>

      {/* ✅ Sidebar Menu Items */}
      <div className="flex flex-col gap-2 p-2">
        {sideMenuData.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`flex items-center gap-3 metadata-font-size p-2 cursor-pointer rounded-md transition-all duration-200
                ${
                  isActive
                    ? "text-theme border-r-4 border-[#6fc5ff] bg-[#6fc5ff10] font-bold"
                    : "text-color-light hover:bg-[#6fc5ff10] hover:border-r-4 hover:border-[#6fc5ff]"
                }
              `}
            >
              <item.icon className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
