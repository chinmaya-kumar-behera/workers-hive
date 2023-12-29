import axios from "axios";

export const crateChatService = (data) => {
    return axios.post("http://localhost:5000/api/chat/create", { ...data });
};

export const getUserChatsService = (data) => {
  return axios.get(`http://localhost:5000/api/chat/${data.userId}/get`);
};

export const createMessageService = (data) => {
  return axios.post(`http://localhost:5000/api/message/${data.chat}/create`, data);
};

export const getMessagesService = (data) => {
  return axios.get(`http://localhost:5000/api/message/${data.chat}/get`, {
    params: { ...data },
  });
};

