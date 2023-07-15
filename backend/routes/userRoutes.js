const express = require("express");
const {
    registerUser,
    authUser,
    allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user and get all users
router.route("/").post(registerUser).get(protect, allUsers);

// Authenticate user login
router.post("/login", authUser);

module.exports = router;
