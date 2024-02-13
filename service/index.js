const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = require("./app");
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log('User connected : ', socket.id); 

  socket.on('setup', (user) => {
    socket.join(user._id);
    socket.emit("connection");
  })

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    socket.emit("message received", newMessageRecieved);
    if (!chat.users) return console.log("chat.users not defined");

    console.log("length of users : ", chat.users.length);

    chat.users.forEach((user) => {
      if (user == newMessageRecieved.sender._id) return;
      console.log("Event emmitted");
      socket.to(chat._id).emit("message", newMessageRecieved);
    });
  });

  socket.on('disconnect', () => {
    console.log("User disconnected !", socket.id)
  })
});

server.listen(PORT, () => {
  console.log(`sever running on port ${PORT}`);
});
