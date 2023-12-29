const express = require("express");
const { connectToDatabase } = require("./src/config/db");
const adminRouter = require("./src/routes/adminRoutes");
const router = require("./src/routes/router");

const cors = require("cors");
const { chatRouter } = require("./src/routes/chatRouter");
const { messageRouter } = require("./src/routes/messageRoutes");
require("dotenv").config();

const app = express();

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("API is working fine !");
});

app.use("/api/admin", adminRouter);
app.use("/api", router);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

module.exports = app;
