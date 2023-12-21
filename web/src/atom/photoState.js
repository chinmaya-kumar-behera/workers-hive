import { atom } from "recoil";

export const PhotoState = atom({
  key: "PhotoState",
  default: {
    isOpen: false,
    photo: "",
  },
});
