import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const UserCard = ({ userInfo }) => {
  const [showMenu, setShowMenu] = useState(false);

  const totalTasks = (userInfo.pendingTasks || 0) + (userInfo.inProgressTasks || 0) + (userInfo.completedTasks || 0);
  const completionRate = totalTasks > 0 ? Math.round(((userInfo.completedTasks || 0) / totalTasks) * 100) : 0;

  return (
    <div className="user-card group hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center md:flex-col gap-3 flex-1 min-w-0">
          <div className="relative">
            <img
              src={userInfo.profileImageUrl || "/default-avatar.png"}
              alt={userInfo?.name}
              className="w-12 h-12 md:w-20 md:h-20 rounded-full border-3 border-color-primary object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="metadata-font-size font-semibold text-theme truncate md:text-center w-full">
                {userInfo?.name}
              </h3>
              
            </div>
            <p className="small-font-size text-color-light truncate flex items-center gap-1 bg-surface md:text-center w-full p-2 rounded-lg">
              {userInfo?.email}
            </p>
            
          </div>
        </div>
      </div>

  

     
      {/* Task Breakdown */}
      <div className="border-t border-color-surface pt-4">
        <div className="space-y-2">
          <TaskStat 
            label="Not Started" 
            count={userInfo?.pendingTasks || 0} 
            icon={AlertCircle}
            color="text-red-500"
            bgColor="bg-red-500"
          />
          <TaskStat 
            label="In Progress" 
            count={userInfo?.inProgressTasks || 0} 
            icon={Clock}
            color="text-amber-500"
            bgColor="bg-amber-500"
          />
          <TaskStat 
            label="Completed" 
            count={userInfo?.completedTasks || 0} 
            icon={CheckCircle2}
            color="text-green-500"
            bgColor="bg-green-500"
          />
        </div>
      </div>

     
    </div>
  );
};

// Enhanced TaskStat Component
const TaskStat = ({ label, count, icon: Icon, color, bgColor }) => {
  return (
    <div className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform`} />
        <span className="small-font-size font-medium text-theme">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`small-font-size font-bold ${color}`}>
          {count}
        </span>
        <div className={`w-2 h-2 rounded-full ${bgColor} group-hover:scale-125 transition-transform`}></div>
      </div>
    </div>
  );
};

export default UserCard;