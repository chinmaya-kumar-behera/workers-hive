import { atom } from "recoil";

export const appointmentModalState = atom({
  key: "AppointmentModalState",
  default: false,
});


export const appointmentStateData= atom({
  key: "AppointmentStateData",
  default: {
    workerData: "",
    formData: {},
  },
});

export const UserAppointments = atom({
  key: "UserAppointments",
  default: {
    appointments: [],
    page: 0,
    totalPages: 0,
  },
});

export const WorkerAppointments= atom({
  key: "WorkerAppointments",
  default: [],
});