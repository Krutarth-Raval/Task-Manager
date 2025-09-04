import React, { useState } from "react";
import Progress from "../Layout/Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Timer,
  Target,
  Users,
  PlayCircle,
  PauseCircle,
  Activity,
} from "lucide-react";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case "In Progress":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          icon: PlayCircle,
          dotColor: "bg-blue-500",
        };
      case "Completed":
        return {
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          icon: CheckCircle2,
          dotColor: "bg-green-500",
        };
      default:
        return {
          color: "text-color-light",
          bgColor: "bg-gray-50 dark:bg-gray-700/20",
          borderColor: "border-gray-200 dark:border-gray-800",
          icon: PauseCircle,
          dotColor: "bg-gray-600",
        };
    }
  };

  const getPriorityConfig = () => {
    switch (priority) {
      case "High":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          icon: AlertTriangle,
        };
      case "Medium":
        return {
          color: "text-orange-600",
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
          icon: Zap,
        };
      default:
        return {
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          icon: Target,
        };
    }
  };

  const formatDate = (date) => {
    return moment(date).format("MMM DD");
  };

  const getDaysUntilDue = () => {
    const today = moment();
    const due = moment(dueDate);
    const daysLeft = due.diff(today, "days");

    if (daysLeft < 0)
      return {
        text: "Overdue",
        color: "text-red-500",
        urgent: true,
        bg: "bg-red-100/50",
      };
    if (daysLeft === 0)
      return {
        text: "Due today",
        color: "text-orange-500",
        urgent: true,
        bg: "bg-orange-100/50",
      };
    if (daysLeft <= 3)
      return {
        text: `${daysLeft}d left`,
        color: "text-orange-500",
        urgent: true,
        bg: "bg-orange-100/50",
      };
    return {
      text: `${daysLeft}d left`,
      color: "text-gray-500",
      urgent: false,
      bg: "bg-gray-100/50",
    };
  };

  const statusConfig = getStatusConfig();
  const priorityConfig = getPriorityConfig();
  const StatusIcon = statusConfig.icon;
  const PriorityIcon = priorityConfig.icon;
  const dueInfo = getDaysUntilDue();

  return (
    <div
      className="group relative  bg-surface border border-gray-200 dark:border-gray-400 rounded-xl  cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}
            ></div>
            <span className={`text-xs font-medium ${statusConfig.color}`}>
              {status}
            </span>
          </div>

          {/* Priority badge */}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.color}`}
          >
            <PriorityIcon className="w-3 h-3" />
            <span>{priority}</span>
          </div>
        </div>

        {/* Title - Fixed height with ellipsis */}
        <h3 className="metadata-font-size font-semibold text-color leading-5 h-5 overflow-hidden">
          <span className="line-clamp-1">{title}</span>
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Description - Fixed height */}
        <div className="mb-4 h-12 overflow-hidden">
          <p className="small-font-size text-color-light line-clamp-2 leading-4">
            {description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium text-color-light">
              {Math.round(progress || 0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                status === "Completed"
                  ? "bg-green-500"
                  : status === "In Progress"
                  ? "bg-blue-500"
                  : "bg-gray-400"
              }`}
              style={{ width: `${progress || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Tasks count */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-color" />
            <span className="small-font-size text-color-light">
              {completedTodoCount}/{todoChecklist.length || 0} tasks completed
            </span>
          </div>
        </div>

        {/* Footer - pushed to bottom */}
        <div className="mt-auto space-y-3">
          {/* Due date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Timer className={`w-4 h-4 ${dueInfo.color}`} />
              <span className="small-font-size text-gray-500">Due:</span>{" "}
              <div className="small-font-size font-bold text-color-light">
                {formatDate(dueDate)}
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div
                className={`text-xs ${dueInfo.color} ${dueInfo.bg} p-1 rounded-md font-medium`}
              >
                {dueInfo.text}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            {/* Assigned users */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <AvatarGroup
                avatars={assignedTo || []}
                maxVisible={3}
                size="sm"
              />
            </div>

            {/* Attachment count */}
            {attachmentCount > 0 && (
              <div className="flex items-center gap-2 px-2 py-1 bg-secondary rounded-md">
                <LuPaperclip className="w-5 h-5 text-color-primary" />
                <span className="metadata-font-size text-color">
                  {attachmentCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
