import React from "react";
import Progress from "../Layout/Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
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
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-red-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-red-500/10";
    }
  };
  return (
    <div
      className="bg-surface border-2 border-color-surface rounded-xl py-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-end gap-3 px-4">
        <div
          className={`small-font-size font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}
        >
          {status}
        </div>

        <div
          className={`small-font-size font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded `}
        >
          {priority}
        </div>
      </div>

      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-indigo-500"
            : "border-violet-500"
        }`}
      >
        <p className="metadata-font-size font-medium text-color mt-4 line-clamp-2 pb-2 border-b-2 border-color ">
          {title}
        </p>
        <p className="small-font-size text-color-light mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>
        <p className="small-font-size text-color-light font-medium mt-2 mb-2 leading-[18px]">
          Task Done: {""}
          <span className="font-semibold text-color">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />

        <div className="">
          <div className="flex items-center justify-between my-1">
            <div className="">
              <label className="small-font-size text-color-light">
                Start Date{" "}
              </label>
              <p className="text-[13px] font-medium text-color">
                {moment(createAt).format("D0 MMM YYYY")}
              </p>
            </div>

            <div>
              <label className="small-font-size text-color-light ">
                Due Date
              </label>
              <p className="text-[13px] font-medium text-color">
                {moment(dueDate).format("D0 MMM YYYY")}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <AvatarGroup avatars={assignedTo || []} />
            {attachmentCount > 0 && (
              <div className="flex items-center  gap-1 px-3 py-1 rounded-full  border border-blue-200">
                <LuPaperclip className="text-color-primary" />
                <span className="small-font-size text-color"></span>
                <span className="small-font-size font-semibold text-color">
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
