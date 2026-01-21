// ===== IMPROVED CREATE TASK COMPONENT =====
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import {
  LucideTrash2,
  Save,
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from "lucide-react";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

import { axiosInstance } from "/src/utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import { PRIORITY_DATA } from "../../utils/data";

// Constants
const INITIAL_TASK_DATA = {
  title: "",
  description: "",
  priority: "Low",
  dueDate: "",
  assignedTo: [],
  todoCheckList: [],
  attachments: [],
};

const VALIDATION_RULES = {
  title: { required: true, minLength: 3, maxLength: 100 },
  description: { required: true, minLength: 10, maxLength: 1000 },
  dueDate: { required: true },
  assignedTo: { required: true, minItems: 1 },
  todoCheckList: { required: true, minItems: 1 },
};

// Enhanced validation hook
const useFormValidation = (taskData) => {
  return useMemo(() => {
    const errors = {};

    if (!taskData.title.trim()) {
      errors.title = "Title is required";
    } else if (
      taskData.title.trim().length < VALIDATION_RULES.title.minLength
    ) {
      errors.title = `Title must be at least ${VALIDATION_RULES.title.minLength} characters`;
    } else if (
      taskData.title.trim().length > VALIDATION_RULES.title.maxLength
    ) {
      errors.title = `Title must not exceed ${VALIDATION_RULES.title.maxLength} characters`;
    }

    if (!taskData.description.trim()) {
      errors.description = "Description is required";
    } else if (
      taskData.description.trim().length <
      VALIDATION_RULES.description.minLength
    ) {
      errors.description = `Description must be at least ${VALIDATION_RULES.description.minLength} characters`;
    }

    if (!taskData.dueDate) {
      errors.dueDate = "Due date is required";
    } else {
      const selectedDate = moment(taskData.dueDate);
      const today = moment().startOf("day");
      if (selectedDate.isBefore(today)) {
        errors.dueDate = "Due date cannot be in the past";
      }
    }

    if (!taskData.assignedTo || taskData.assignedTo.length === 0) {
      errors.assignedTo = "Please assign the task to at least one team member";
    }

    if (!taskData.todoCheckList || taskData.todoCheckList.length === 0) {
      errors.todoCheckList = "Please add at least one todo item";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      hasErrors: Object.keys(errors).length > 0,
    };
  }, [taskData]);
};

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  // State management
  const [taskData, setTaskData] = useState(INITIAL_TASK_DATA);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!taskId);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Form validation
  const { errors, isValid, hasErrors } = useFormValidation(taskData);

  // Derived state
  const isEditMode = !!taskId;
  const pageTitle = isEditMode ? "Update Task" : "Create Task";
  const submitButtonText = isEditMode ? "UPDATE TASK" : "CREATE TASK";

  // Priority color mapping
  const priorityConfig = {
    Low: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
    Medium: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Clock },
    High: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  };

  const handleValueChange = useCallback(
    (key, value) => {
      setTaskData((prevData) => ({ ...prevData, [key]: value }));
      setHasUnsavedChanges(true);
      if (showValidationErrors) {
        setShowValidationErrors(false);
      }
    },
    [showValidationErrors]
  );

  const resetForm = useCallback(() => {
    setTaskData(INITIAL_TASK_DATA);
    setHasUnsavedChanges(false);
    setShowValidationErrors(false);
  }, []);

  const createTask = useCallback(async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoCheckList?.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Task created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating task:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create task";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [taskData, resetForm]);

  const updateTask = useCallback(async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoCheckList?.map((item) => {
        const prevTodoCheckList = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoCheckList.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Task updated successfully!");
      setHasUnsavedChanges(false);
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update task";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [taskData, currentTask, taskId, navigate]);

  const fetchTaskDetails = useCallback(async () => {
    if (!taskId) return;

    setInitialLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response?.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData({
          title: taskInfo.title || "",
          description: taskInfo.description || "",
          priority: taskInfo.priority || "Low",
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoCheckList:
            taskInfo?.todoCheckList?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to load task details";
      toast.error(errorMessage);
      navigate("/admin/tasks");
    } finally {
      setInitialLoading(false);
    }
  }, [taskId, navigate]);

  const deleteTask = useCallback(async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully!");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete task";
      toast.error(errorMessage);
    }
  }, [taskId, navigate]);

  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      setShowValidationErrors(true);
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    if (isEditMode) {
      await updateTask();
    } else {
      await createTask();
    }
  }, [isValid, errors, isEditMode, updateTask, createTask]);

  const handleCancel = useCallback(() => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate("/admin/tasks");
      }
    } else {
      navigate("/admin/tasks");
    }
  }, [hasUnsavedChanges, navigate]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (initialLoading) {
    return (
      <DashboardLayout activeMenu="Create Task">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading task details...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-color rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="title-font-size font-bold text-gradient-secondary">
                  {pageTitle}
                </h1>
                {isEditMode && currentTask && (
                  <p className="text-sm text-color-light mt-1">
                    Created{" "}
                    {moment(currentTask.createdAt).format("MMM DD, YYYY")} •
                    Last updated {moment(currentTask.updatedAt).fromNow()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="group flex items-center gap-2 px-4 py-2 metadata-font-size font-medium text-color bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-100 transition-colors cursor-pointer"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90 text-red-600 group-hover:scale-140" />
                  Cancel
                </button>

                {isEditMode && (
                  <button
                    className="flex items-center gap-2 px-4 py-2 metadata-font-size font-medium text-red-600 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                    onClick={() => setOpenDeleteAlert(true)}
                  >
                    <LucideTrash2 className="w-4 h-4 text-red-600 group-hover:scale-140" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-color-light mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  showValidationErrors && errors.title
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                } outline-none`}
                placeholder="e.g., Design new user dashboard"
                maxLength={VALIDATION_RULES.title.maxLength}
              />
              <div className="flex justify-between items-center mt-1">
                {showValidationErrors && errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
                <p className="text-xs text-gray-400 ml-auto">
                  {taskData.title.length}/{VALIDATION_RULES.title.maxLength}
                </p>
              </div>
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-color-light mb-2">
                Description *
              </label>
              <textarea
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  showValidationErrors && errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                } outline-none`}
                placeholder="Provide a detailed description of what needs to be done..."
                rows={4}
                maxLength={VALIDATION_RULES.description.maxLength}
              />
              <div className="flex justify-between items-center mt-1">
                {showValidationErrors && errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
                <p className="text-xs text-gray-400 ml-auto">
                  {taskData.description.length}/
                  {VALIDATION_RULES.description.maxLength}
                </p>
              </div>
            </div>

            {/* Priority, Due Date, Assign To */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-color-light mb-2">
                  Priority
                </label>
                <SelectDropdown
                  option={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
                {taskData.priority && (
                  <div
                    className={`flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      priorityConfig[taskData.priority].bg
                    } ${priorityConfig[taskData.priority].color}`}
                  >
                    {React.createElement(
                      priorityConfig[taskData.priority].icon,
                      { className: "w-3 h-3" }
                    )}
                    {taskData.priority} Priority
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-color-light mb-2">
                  Due Date *
                </label>

                <div className="relative ">
                  <input
                    type="date"
                    value={taskData.dueDate}
                    onChange={({ target }) =>
                      handleValueChange("dueDate", target.value)
                    }
                    min={moment().format("YYYY-MM-DD")}
                    className={`
    w-full px-4 py-3 border rounded-lg transition-all 
    bg-surface text-color border-gray-300 
    hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none 
    ${
      showValidationErrors && errors.dueDate
        ? "border-red-400 dark:border-red-500"
        : ""
    }
    `}
    
                  />
                </div>

                {showValidationErrors && errors.dueDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
                )}

                {taskData.dueDate && (
                  <p className="text-xs border-1 border-color-light w-max p-2 py-1 rounded-4xl text-gray-500 dark:text-gray-400 mt-1">
                    {moment(taskData.dueDate).fromNow()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-color-light mb-2">
                  Assign To *
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                  maxUsers={10}
                />
                {showValidationErrors && errors.assignedTo && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.assignedTo}
                  </p>
                )}
              </div>
            </div>

            {/* TODO Checklist */}
            <div>
              <label className="block text-sm font-medium text-color-light mb-2">
                Task Checklist *
              </label>
              <TodoListInput
                todoList={taskData.todoCheckList}
                setTodoList={(value) =>
                  handleValueChange("todoCheckList", value)
                }
              />
              {showValidationErrors && errors.todoCheckList && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.todoCheckList}
                </p>
              )}
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-color-light mb-2">
                Attachments
                <span className="text-gray-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {/* Form Validation Summary */}
            {showValidationErrors && hasErrors && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 mb-2">
                      Please fix the following issues:
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 rounded-b-xl ">
            <div className="flex items-center flex-col gap-3 md:flex-row justify-between">
              <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Unsaved changes</span>
                  </div>
                )}
              </div>

              <button
                className={`flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-color"
                    : isValid
                    ? "bg-blue-600 hover:bg-blue-700 text-color shadow-sm hover:shadow"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                } cursor-pointer`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <p className="metadata-font-size flex items-center gap-2 text-nowrap">
                    <Save className="w-6 h-6" />
                    {submitButtonText}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task? This action cannot be undone and all associated data will be permanently removed."
          onDelete={deleteTask}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
