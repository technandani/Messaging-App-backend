const express = require("express");
const { getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus } = require("../controllers/userController");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// User Management Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/status/:id", updateUserStatus);

module.exports = router;
