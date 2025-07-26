const Task = require("../models/Task.js");
const User = require("../models/User.js");

const bcrypt = require("bcryptjs");

//@desc GET all users (Admin Only)
//@route GET /api/users/
//@access Private (Admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    //Add task counts to each user
    const userWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Not Started",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc, //include all existing user data
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    return res.status(201).json(userWithTaskCounts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//@desc GET user By ID
//@route GET api/users/:id
//@access Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUserById, getUsers };
