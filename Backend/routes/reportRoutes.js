const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../Controllers/reportController");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport); //Export all task as excel/PDF

router.get("/export/users", protect, adminOnly, exportUsersReport); // export user-task report

module.exports = router;
