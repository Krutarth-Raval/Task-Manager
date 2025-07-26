const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../Controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

//auth Routes

router.post("/register", registerUser); //Register User
router.post("/login", loginUser); // login user
router.get("/profile", protect, getUserProfile); //get user profile
router.put("update-profile", protect, updateUserProfile); //update user profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  return res.status(200).json({ imageUrl });
}); //Upload user image
module.exports = router;
