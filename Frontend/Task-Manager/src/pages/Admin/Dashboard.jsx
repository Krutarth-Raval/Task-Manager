import CustomPieChart from "../../components/Charts/CustomPieChart";
import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_PATHS, axiosInstance, addThousandSeparator } from "../../utils";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import TaskListTable from "../../components/Layout/TaskListTable";
import {
  ChevronRight,
  Sparkles,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { UserContext } from "../../_Context/UserContext";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  // Custom hook to protect routes
  useUserAuth();

  // Get user from context
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Local state for dashboard and chart data
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  //prepare Chart Data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriority = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Not Started", count: taskDistribution?.NotStarted || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelsData = [
      { priority: "Low", count: taskPriority?.Low || 0 },
      { priority: "Medium", count: taskPriority?.Medium || 0 },
      { priority: "High", count: taskPriority?.High || 0 },
    ];

    setBarChartData(PriorityLevelsData);
  };

  // Fetch dashboard data from API
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  // Run once when component mounts
  useEffect(() => {
    getDashboardData();
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = moment().hour();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-spin opacity-60"
          style={{ animationDuration: "30s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/40 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/50 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-400/30 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-3/4 w-2 h-2 bg-emerald-400/35 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Greeting Section */}
        <div className="dashboard-hero-card mb-8">
          <div className="relative overflow-hidden">
            {/* Hero glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl"></div>

            <div className="p-8 lg:p-10 relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className=" space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-full">
                      <h1 className="text-2xl lg:text-3xl text-gradient-secondary font-bold">
                        {getGreeting()}
                        {user?.name ? `, ${user.name}!` : "!"}
                      </h1>
                      <div className=" w-full mt-1 flex items-center gap-2 text-sm text-color-light">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {moment().format("dddd, MMMM Do YYYY")}
                        </span>

                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-5">
              <div className="enhanced-info-card group">
                <div className="card-glow total-tasks"></div>
                <InfoCard
                  label="Total Tasks"
                  value={addThousandSeparator(
                    dashboardData?.charts?.taskDistribution?.All || 0
                  )}
                  color="bg-gradient-to-br from-blue-500 to-purple-600 "
                />
              </div>

              <div className="enhanced-info-card group">
                <div className="card-glow not-started"></div>
                <InfoCard
                  label="Not Started"
                  value={addThousandSeparator(
                    dashboardData?.charts?.taskDistribution?.NotStarted || 0
                  )}
                  color="bg-gradient-to-br from-violet-500 to-purple-600"
                />
              </div>

              <div className="enhanced-info-card group">
                <div className="card-glow in-progress"></div>
                <InfoCard
                  label="In Progress"
                  value={addThousandSeparator(
                    dashboardData?.charts?.taskDistribution?.InProgress || 0
                  )}
                  color="bg-gradient-to-br from-cyan-500 to-blue-500"
                />
              </div>

              <div className="enhanced-info-card group">
                <div className="card-glow completed"></div>
                <InfoCard
                  label="Completed"
                  value={addThousandSeparator(
                    dashboardData?.charts?.taskDistribution?.Completed || 0
                  )}
                  color="bg-gradient-to-br from-lime-500 to-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" >
          {/* Pie Chart Card */}
          <div className="chart-card group">
            <div className="chart-card-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-5 border-blue-400 border-t-blue-800 border-l-violet-600"></div>
                </div>
                <h3 className="text-lg font-bold text-color">
                  Task Distribution
                </h3>
              </div>
              <div className="status-indicator">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Live
                </span>
              </div>
            </div>
            <div className="chart-container">
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="chart-card group">
            <div className="chart-card-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-color">
                  Task Priority Levels
                </h3>
              </div>
              <div className="status-indicator">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Live
                </span>
              </div>
            </div>
            <div className="chart-container">
              <CustomBarChart data={barChartData} />
            </div>
          </div>
        </div>

        {/* Enhanced Recent Tasks Section */}
        <div className="recent-tasks-card">
          <div className="recent-tasks-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/10 to-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-color">
                  Recent Tasks
                </h3>
                <p className="text-sm text-color-light">
                  Latest activity in your workspace
                </p>
              </div>
            </div>

            <button className="enhanced-see-all-btn group" onClick={onSeeMore}>
              <span className="font-medium">See All Tasks</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="btn-glow"></div>
            </button>
          </div>

          <div className="table-container">
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
