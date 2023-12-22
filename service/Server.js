const app = require("./app");

const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;


io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("user-join", (message) => {
    console.log("Join request received with message:", message);
    io.emit("chat-message");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});