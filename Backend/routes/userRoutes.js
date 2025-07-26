const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../Controllers/userController.js");

const router = express.Router();

//user management Routes
router.get("/", protect, adminOnly, getUsers); // Get All users (admin only)
router.get("/:id", protect, getUserById); // Get user by id

module.exports = router;
