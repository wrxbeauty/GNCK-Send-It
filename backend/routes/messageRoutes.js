const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for fetching all messages of a chat
router.route("/:chatId").get(protect, allMessages);

// Route for sending a new message
router.route("/").post(protect, sendMessage);

module.exports = router;
