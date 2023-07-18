const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for creating or fetching a chat (one-to-one or group)
router.route("/").post(protect, accessChat);

// Route for fetching all chats for a user
router.route("/").get(protect, fetchChats);

// Route for creating a new group chat
router.route("/group").post(protect, createGroupChat);

// Route for renaming a group chat
router.route("/rename").put(protect, renameGroup);

// Route for removing a user from a group chat
router.route("/groupremove").put(protect, removeFromGroup);

// Route for adding a user to a group chat or leaving a group chat
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
