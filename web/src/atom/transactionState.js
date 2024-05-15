import { atom } from "recoil";

export const TransactionModalState = atom({
  key: "TransactionModalState",
  default: false,
});

export const TransactionDataState = atom({
  key: "TransactionDataState",
  default: {
    sender: {},
    receiver: {},
    amount: 8000,
    appointmentId:"",
  },
});
