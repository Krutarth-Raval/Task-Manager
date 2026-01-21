import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { axiosInstance } from "/src/utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import { Users, Search, Filter } from "lucide-react";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    setDownloadLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading user details:", error);
      toast.error("Failed to download user details. Please try again.");
    } finally {
      setDownloadLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [allUsers, searchTerm]);

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Team Members">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-color-light">Loading team members...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="title-font-size font-bold text-gradient-secondary">
                Team Members
              </h1>
              <p className="text-color-light mt-1 flex items-center gap-2">
                Manage and overview your team
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                  {allUsers.length} {allUsers.length === 1 ? 'member' : 'members'}
                </span>
              </p>
            </div>
          </div>

          <button
            className={`download-btn dark:text-black flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              downloadLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-102'
            }`}
            onClick={handleDownloadReport}
            disabled={downloadLoading}
          >
            {downloadLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <LuFileSpreadsheet className="metadata-font-size" />
            )}
            <span className="font-medium">
              {downloadLoading ? 'Downloading...' : 'Download Report'}
            </span>
            
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 bg-color p-4 rounded-xl ">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-5" />
            <input
              type="text"
              placeholder="Search team members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-color text-color transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                Clear search
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-color-light">
              <Filter className="w-4 h-4" />
              <span>
                {filteredUsers.length === allUsers.length 
                  ? `All ${allUsers.length} members`
                  : `${filteredUsers.length} of ${allUsers.length} members`
                }
              </span>
            </div>
          </div>
        </div>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-color rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-color mb-2">
              {searchTerm ? "No members found" : "No team members"}
            </h3>
            <p className="text-color-light max-w-md">
              {searchTerm 
                ? `No team members match "${searchTerm}". Try adjusting your search term.`
                : "Start by adding team members to your workspace to see them here."
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;