const Message = require("../models/messageModel");

const createMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { chat, sender, content } = req.body;

    if (!chat || !sender || !content) {
      return res
        .status(400)
        .json({ message: "Please fill in all the details." });
    }

    const message = await Message.create(req.body);

    // First populate
    await message.populate("sender", "name _id photo")
    await message.populate("chat", 'users');


    res.status(200).json({ message: "Message Created", data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  console.log(req.query);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20; // Default limit is 20

  if (!chatId) {
    res.status(400).json({ message: "ChatId not Found" });
    return;
  }

  try {
    const totalMessages = await Message.countDocuments({ chat: chatId });

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name photo _id")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalMessages / limit);

    res.status(200).json({
      message: "Messages Fetched",
      data: messages.reverse(),
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createMessage, getMessages };
