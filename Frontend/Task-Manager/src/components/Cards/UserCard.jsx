import React, { useState } from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card">
      {/* User Info Section */}
      <div className="flex items-center gap-3 mb-4">
        {userInfo?.profileImageUrl ? (
          <img
            src={userInfo.profileImageUrl}
            alt={`${userInfo?.name} avatar`}
            className="w-12 h-12 rounded-full border-2 border-color-surface object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-color-surface bg-surface flex items-center justify-center">
            <span className="metadata-font-size font-semibold text-color-light">
              {userInfo?.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}
        <div>
          <h3 className="metadata-font-size font-semibold text-theme">
            {userInfo?.name}
          </h3>
          <p className="small-font-size text-color-light">
            {userInfo?.email}
          </p>
        </div>
      </div>

      <div className="border-t border-color-surface pt-4">
        <div className="space-y-3">
          <TaskStat 
            label="Not Started" 
            count={userInfo?.pendingTasks || 0} 
            status="Not Started"
          />
          <TaskStat 
            label="In Progress" 
            count={userInfo?.inProgressTasks || 0} 
            status="In Progress"
          />
          <TaskStat 
            label="Completed" 
            count={userInfo?.completedTasks || 0} 
            status="Completed"
          />
        </div>
      </div>
    </div>
  );
};
export default UserCard
const TaskStat = ({ label, count, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500";
      case "Completed":
        return "text-indigo-500";
      default:
        return "text-violet-500";
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="small-font-size font-medium text-theme">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`small-font-size font-bold ${getStatusColor()}`}>
          {count}
        </span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
      </div>
    </div>
  );
};