import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { Crown, Mail, Circle } from "lucide-react";
import { UserContext } from "../../_Context/UserContext";

/**
 * Enhanced SideMenu component - shows the sidebar menu for admin or user
 * - Beautiful glassmorphism design with modern animations
 * - Responsive for mobile and desktop
 * - Smooth transitions and hover effects
 * - Enhanced user profile section
 * - Proper fixed positioning and scrolling
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
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {}} // This should be handled by parent component
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          ${
            isMobile
              ? `fixed top-18 left-0 w-80 h-[calc(100vh-4rem)] z-50 transition-transform duration-300 ease-out lg:hidden ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-full h-full"
          }
        `}
      >
        <div className="sidebar-container w-full h-full flex flex-col overflow-hidden">
          {/* Enhanced User Profile Section - Fixed at top */}
          <div className="profile-card flex-shrink-0">
            <div className="flex items-center gap-4 mb-3">
              {/* Enhanced profile image */}
              <div className="profile-image-wrapper">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-placeholder">No Image</div>
                )}
              </div>

              {/* User info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm uppercase truncate text-gradient-primary">
                    {user?.name || "User"}
                  </h3>
                  {user?.role === "admin" && (
                    <div className="admin-badge">
                      <Crown className="w-3 h-3" />
                      <span>Admin</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-color-light truncate opacity-80">
                  {user?.role || "User"}
                </p>
              </div>
            </div>

            {/* Email badge */}
            <div className="email-badge">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate text-xs">
                  {user?.email || "email@example.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Menu Items - Scrollable */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-1">
              {sideMenuData.map((item, index) => {
                const isActive = activeMenu === item.label;

                return (
                  <button
                    key={`menu_${index}`}
                    onClick={() => handleClick(item.path)}
                    className={`menu-item group w-full ${isActive ? "active" : ""}`}
                  >
                    <div className="menu-icon-wrapper">
                      <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="font-medium truncate transition-all duration-300">
                      {item.label}
                    </span>

                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-white/50 to-white/20 rounded-l-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideMenu;