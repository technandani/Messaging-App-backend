const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Teacher", "Student", "Institute"], required: true },
    online: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
