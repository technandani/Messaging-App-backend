const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { setupSocket } = require("./socket");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cors());

// MongoDB Connection
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("databse error: ", err));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

// Setup WebSocket
const io = setupSocket(server);

// ✅ Pass io to routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);