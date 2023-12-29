const express = require("express");
const { createMessage, getMessages } = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.post("/:chatId/create",createMessage);
messageRouter.get("/:chatId/get", getMessages);

module.exports = { messageRouter };
