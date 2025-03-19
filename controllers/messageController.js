const Message = require("../models/message");
const User = require("../models/user");

exports.sendMessage = async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;
        if (!sender || !receiver || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);
        if (!senderUser || !receiverUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const newMessage = new Message({ sender, receiver, content });
        await newMessage.save();

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @desc Get messages between two users
 * @route GET /api/messages/:user1/:user2
 */
exports.getMessages = async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @desc Delete a message
 * @route DELETE /api/messages/:id
 */
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ error: "Message not found" });

        await message.deleteOne();
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.replyMessage = async (req, res) => {
    try {
        const { sender, receiver, content, originalMessageId } = req.body;

        const originalMessage = await Message.findById(originalMessageId);
        if (!originalMessage) {
            return res.status(404).json({ error: "Original message not found" });
        }

        const newMessage = new Message({ sender, receiver, content });
        await newMessage.save();

        res.status(201).json({ message: "Reply sent successfully", newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
