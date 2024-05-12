import { atom } from "recoil";

export const appointmentModalState = atom({
  key: "appointmentModalState",
  default: false,
});


export const appointmentStateData= atom({
  key: "appointmentStateData",
  default: {
    workerData: "",
    formData: {},
  },
});
