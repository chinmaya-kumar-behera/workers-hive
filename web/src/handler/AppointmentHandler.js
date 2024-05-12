import React from "react";
import {
  appointmentBookService,
  getUserAppointmentsService,
  getWorkerAppointmentsService,
} from "../services/appointmentService";

const AppointmentHandler = () => {
  const appointmentBookHandler = async (data) => {
    return await appointmentBookService(data);
  };

  const getWorkerAppointmentsHandler = async (data) => {
    return await getWorkerAppointmentsService(data);
  };
  
  const getUserAppointmentsHandler = async (data) => {
    return await getUserAppointmentsService(data);
  };

  return {
    appointmentBookHandler,
    getWorkerAppointmentsHandler,
    getUserAppointmentsHandler,
  };
};

export default AppointmentHandler;
