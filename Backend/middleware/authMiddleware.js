const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware to protect routes

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // extract token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token Failed", error: error.message });
  }
};

//middleware  to admin-only access

const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied, Admin Only" });
  }
};

module.exports = { protect, adminOnly };
