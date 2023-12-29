const Chat = require("../models/chatModel");

const createChat = async (req, res) => {
  try {
    console.log(req.body);
    const { users = [] } = req.body;

    if (users.length < 2) {
      res.status(404).json({ message: "User is not found" });
      return; 
    }

    const existingChat = await Chat.findOne({ users });

    if (existingChat) {
      res
        .status(200)
        .json({ message: "Chat is already created", data: existingChat });
      return; 
    }

    const result = await Chat.create({ users });

    res
      .status(200)
      .json({ message: "Chat created successfully!", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getChats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json({ message: "UserId is not found" });
    }

    const result = await Chat.find({ users: { $in: userId } }).populate(
      "users",
      "name email photo _id"
    );

    res
      .status(200)
      .json({ message: "Chats Fetched successfully !", data: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createChat, getChats };
