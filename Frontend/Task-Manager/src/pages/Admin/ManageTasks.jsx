import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        { label: "Not Started", count: statusSummary.notStarted || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
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
        document.body.appendChild(link)
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);  

    } catch (error) {
      console.error("Error downloading expense details:", error)
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left section: Title + small screen button */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <h2 className="description-font-size font-medium">My Tasks</h2>

            {/* Download button - Only visible on SMALL screens */}
            {!isLargeScreen && (
              <button
                className="download-btn dark:text-black"
                onClick={handleDownloadReport}
              >
                <div className="flex items-center">
                  <LuFileSpreadsheet className="metadata-font-size" />
                  <span className="ml-1">Download Report</span>
                </div>
              </button>
            )}
          </div>

          {/* Right section: Tabs + large screen button */}
          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              {/* Download button - Only visible on LARGE screens */}
              {isLargeScreen && (
                <button
                  className="download-btn dark:text-black"
                  onClick={handleDownloadReport}
                >
                  <div className="flex items-center">
                    <LuFileSpreadsheet className="metadata-font-size" />
                    <span className="ml-1">Download Report</span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTask?.map((item, index) => (
            <TaskCard
              key={item._id}
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
