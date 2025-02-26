const express = require("express");
const { sendMessage, getMessages, deleteMessage, replyMessage } = require("../controllers/messageController");
const router = express.Router();

// Message Routes
router.post("/", sendMessage); // Send message
router.get("/:user1/:user2", getMessages); // Get chat between users
router.delete("/:id", deleteMessage); // Delete message
router.post("/reply", replyMessage); // Reply to a message

module.exports = router;