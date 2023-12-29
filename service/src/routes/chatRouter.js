const express = require("express");
const { createChat, getChats } = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.get("/:userId/get", getChats);

module.exports = { chatRouter };
