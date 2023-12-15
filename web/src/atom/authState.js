import { atom } from "recoil";

export const AuthState = atom({
  key: "AuthState",
  default: {
    name: "",
    email: "",
    _id: "",
  },
});
