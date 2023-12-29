import { atom } from "recoil";

export const ChatWindow = atom({
  key: "ChatWindow",
  default: false,
});

export const SelectedChat = atom({
  key: "SelectedChat",
  default: {
    room: '',
    user:'',
  },
});
