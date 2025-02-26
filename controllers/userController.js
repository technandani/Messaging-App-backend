const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = role || user.role;

        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateUserStatus = async (req, res) => {
    try {
        const { online } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        user.online = online;
        await user.save();
        res.json({ message: `User status updated to ${online ? "Online" : "Offline"}` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
