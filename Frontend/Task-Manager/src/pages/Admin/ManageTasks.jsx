import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_PATHS, axiosInstance } from "../../utils";
import { LuFileSpreadsheet } from "react-icons/lu";
import {  Plus, Filter, Search, Grid3X3, List, Calendar, Clock, TrendingUp, Users } from "lucide-react";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define breakpoint (1024px is lg in Tailwind)
  const isLargeScreen = windowWidth >= 1024;

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });
      setAllTask(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Not Started", count: statusSummary.notStartedTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.log("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleCreateNew = () => {
    navigate(`/admin/create-task`);
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading task details:", error);
      toast.error("Failed to download task details. Please try again.");
    }
  };

  // Filter tasks based on search term
  const filteredTasks = allTask.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/6 to-purple-400/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-400/25 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Enhanced Header Section */}
        <div className="dashboard-hero-card">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/8 via-blue-500/8 to-cyan-500/8 backdrop-blur-xl"></div>
            
            <div className="p-6 lg:p-8 relative">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left section: Title + Stats */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-gradient-secondary">
                        Task Management
                      </h1>
                      <p className="text-sm text-color-light font-medium">
                        Organize, track, and complete your projects
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-color-light">
                        {allTask.length} Total Tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {Math.round((tabs.find(t => t.label === "Completed")?.count || 0) / Math.max(allTask.length, 1) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right section: Action buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Create Task Button */}
                  <button
                    onClick={handleCreateNew}
                    className="enhanced-create-btn group"
                  >
                    <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                    <span className="font-semibold">Create Task</span>
                    <div className="btn-glow"></div>
                  </button>

                  {/* Download button - Only visible on LARGE screens */}
                  {isLargeScreen && tabs?.[0]?.count > 0 && (
                    <button
                      className="download-btn dark:text-black group"
                      onClick={handleDownloadReport}
                    >
                      <LuFileSpreadsheet className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Download Report</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls Section */}
        <div className="space-y-4">
          {/* Search and View Controls */}
          <div className="flex flex-row sm:flex-row gap-4 items-center justify-end">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-color-light z-10" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all duration-300"
              />
            </div>

            {/* View Mode Toggle & Mobile Download */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className=" bg-white/20 backdrop-blur-md border border-white/30 rounded-xl gap-2 p-1.5 shadow-md hidden md:block">
              <div className="flex gap-2">

                <button
                  onClick={() => setViewMode("grid")}
                  className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              </div>

              {/* Download button - Only visible on SMALL screens */}
              {!isLargeScreen && tabs?.[0]?.count > 0 && (
                <button
                  className="download-btn dark:text-black"
                  onClick={handleDownloadReport}
                >
                  <LuFileSpreadsheet className="w-5 h-5 " />
                  <span className="hidden xs:inline">Download</span>
                </button>
              )}
            </div>
          </div>

          {/* Status Tabs */}
          {tabs?.[0]?.count > 0 && (
            <div className="tabs-card">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
            </div>
          )}
        </div>

        {/* Tasks Grid/List */}
        {isLoading ? (
          <div className="loading-container">
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-12 h-12 border-4 border-primary-color border-t-transparent rounded-full animate-spin"></div>
              <p className="text-color-light font-medium">Loading your tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state-card">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-purple-500/50" />
              </div>
              <h3 className="text-xl font-semibold text-color mb-3">
                {searchTerm ? "No tasks found" : "No tasks yet"}
              </h3>
              <p className="text-color-light mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `No tasks match "${searchTerm}". Try adjusting your search term.`
                  : "Get started by creating your first task to organize your work effectively."
                }
              </p>
              {!searchTerm && (
                <div className="flex justify-center">

                <button
                  onClick={handleCreateNew}
                  className="card-btn-fill"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Task
                </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`tasks-container ${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " 
              : "space-y-4"
          }`}>
            {filteredTasks.map((item, index) => (
              <div 
                key={item._id} 
                className="task-card-wrapper"
                style={{ 
                  animationDelay: `${index * 100}ms` 
                }}
              >
                <TaskCard
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  status={item.status}
                  progress={item.progress}
                  createAt={item.createdAt}
                  dueDate={item.dueDate}
                  assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                  attachmentCount={item.attachments?.length || 0}
                  completedTodoCount={item.completedTodoCount || 0}
                  todoChecklist={item.todoCheckList || []}
                  onClick={() => handleClick(item)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Results Counter */}
        {filteredTasks.length > 0 && (
          <div className="results-counter">
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-color-light">
              <Users className="w-4 h-4" />
              <span>
                Showing {filteredTasks.length} of {allTask.length} tasks
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;