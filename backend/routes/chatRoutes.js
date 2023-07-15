const express = require("express");
const { accessChat, fetchChats, createGroupChat, renameGroup,  addToGroup, removeFromGroup, } = require("../controllers/chatControllers");

// } = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Access chat route
router.route("/").post(protect, accessChat);

// // Fetch chats route
router.route("/").get(protect, fetchChats);

// // Create group chat route
router.route("/group").post(protect, createGroupChat);

// // Rename group route
router.route("/rename").put(protect, renameGroup);

// // Remove user from group route
router.route("/groupremove").put(protect, removeFromGroup);

// // Add user to group route
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
