const Task = require("../models/Task");

//@desc Get all tasks (Admin: all, user:only assigned tasks)
//@route GET /api/tasks/
//@access Private
const getTasks = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Get  tasks by id
//@route GET /api/tasks/:id
//@access Private
const getTasksById = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Create a new Task (Admin Only)
//@route POST /api/tasks/
//@access Private(Admin)
const createTask = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Update  Task details
//@route POST /api/tasks/:id
//@access Private
const updateTask = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Delete a Task (Admin Only)
//@route DELETE /api/tasks/:id
//@access Private(admin)
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Update a Task Status
//@route PUT /api/tasks/:id/status
//@access Private
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Update a Task Checklist
//@route PUT /api/tasks/:id/status
//@access Private
const updateTaskChecklist = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Dashboard Data(Admin Only)
//@route GET /api/tasks/dashboard-data
//@access Private
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

//@desc Dashboard Data(User Specific)
//@route GET /api/tasks/user-dashboard-data
//@access Private
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
