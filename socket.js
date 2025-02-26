const { Server } = require("socket.io");

let users = {}; // Track online users

function setupSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // ✅ Save user as online
        socket.on("setOnline", (userId) => {
            users[userId] = socket.id;
            io.emit("userOnline", { userId, online: true });
        });

        // ✅ Handle user going offline
        socket.on("setOffline", (userId) => {
            delete users[userId];
            io.emit("userOffline", { userId, online: false });
        });

        // ✅ Handle real-time message sending
        socket.on("sendMessage", (message) => {
            console.log("Message received on server:", message);
        
            // ✅ Ensure the message is sent only once per user
            if (users[message.receiver]) {
                io.to(users[message.receiver]).emit("receiveMessage", message);
            }
            if (users[message.sender] && users[message.sender] !== users[message.receiver]) {
                io.to(users[message.sender]).emit("receiveMessage", message);
            }
        });
        

        // ✅ Handle disconnections
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            for (let userId in users) {
                if (users[userId] === socket.id) {
                    io.emit("userOffline", { userId, online: false });
                    delete users[userId];
                    break;
                }
            }
        });
    });
}

module.exports = { setupSocket };
