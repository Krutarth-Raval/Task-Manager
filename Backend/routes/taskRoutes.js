const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../Controllers/taskController");

const router = express.Router();

//task management Routes

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //get all task by ID
router.get("/:id", protect, getTasksById); //get task by ID
router.post("/", protect, adminOnly, createTask); //Create a task (Admin Only)
router.put("/:id", protect, updateTask); //Update task details
router.delete("/:id", protect, adminOnly, deleteTask); //Delete a task (Admin Only)
router.put("/:id/status", protect, updateTaskStatus); //Update task status
router.put("/:id/todo", protect, updateTaskChecklist); //Update task checklist

module.exports = router;
