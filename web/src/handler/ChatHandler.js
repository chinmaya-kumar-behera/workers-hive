import { crateChatService, createMessageService, getMessagesService, getUserChatsService } from "../services/chatService";

const ChatHandler = () => {
    const createChatHandler = async(data) => {
      return await crateChatService(data);
      
  };
  const getUserChatsHandler = async (data) => {
    return await getUserChatsService(data);
  }

  const createMessageHandler = async (data) => {
    return await createMessageService(data);
  }

   const getMessagesHandler = async (data) => {
     return await getMessagesService(data);
  };
  
  return { createChatHandler, getUserChatsHandler, createMessageHandler, getMessagesHandler };
};

export default ChatHandler;
