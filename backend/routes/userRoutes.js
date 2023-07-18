const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for fetching all users
router.route("/").get(protect, allUsers);

// Route for registering a new user
router.route("/").post(registerUser);

// Route for user authentication
router.post("/login", authUser);

module.exports = router;
