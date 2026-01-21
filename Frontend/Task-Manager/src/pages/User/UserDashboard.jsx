import CustomPieChart from "../../components/Charts/CustomPieChart";
import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../Context/UserContext";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandSeparator } from "../../utils/helper";
import TaskListTable from "../../components/Layout/TaskListTable";
import { ChevronRight } from "lucide-react";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ['#8D51FF', '#00B8DB', '#7BCE00']

const UserDashboard = () => {
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
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
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

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="border-1  p-4 rounded-md bg-surface flex flex-col gap-4 ">
        {/* Greeting Section */}
        <div>
          <div className="col-span-3">
            <p className="title-font-size font-semibold">
              Good Morning{user?.name ? `! ${user.name}` : ""}
            </p>
            <p className="metadata-font-size font-normal text-color-light">
              {moment().format("dddd, MMMM Do YYYY")}
            </p>
          </div>
        </div>

        {/* Info Card: Total Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <InfoCard
            label="Total Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Not Started "
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.NotStarted || 0
            )}
            color="bg-violet-500"
          />{" "}
          <InfoCard
            label="In Progress "
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed "
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 my-6 md:my-6">
        
        <div >
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="metadata-font-size font-semibold">
                Task Distribution
              </h5>
            </div>
            <CustomPieChart
              data={pieChartData}
              colors={COLORS}
            />
          </div>
        </div>
        <div>
          <div className="card ">
            <div className="flex items-center justify-between">
              <h5 className="metadata-font-size font-semibold">
                Task Priority
              </h5>
            </div>
            <CustomBarChart
              data={barChartData}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="Card">
            <div className="flex items-center justify-between">
              <h5 className="metadata-font-size font-semibold">Recent Tasks</h5>
              <button
                className="card-btn metadata-font-size flex items-center gap-1 group"
                onClick={onSeeMore}
              >
                See All{" "}
                <ChevronRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
                />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
