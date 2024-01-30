import axios from "axios";

export const crateChatService = (data) => {
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/chat/create`, { ...data });
};

export const getUserChatsService = (data) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/chat/${data.userId}/get`);
};

export const createMessageService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/message/${data.chat}/create`, data);
};

export const getMessagesService = (data) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/message/${data.chat}/get`, {
    params: { ...data },
  });
};

