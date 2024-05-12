import React from 'react'
import { appointmentBookService, getAppointments } from '../services/appointmentService';

const AppointmentHandler = () => {
    const appointmentBookHandler = async(data) => {
        return await appointmentBookService(data);
    }

    const getAppointmentsHandler = async (data) => {
      return await getAppointments(data);
    };

  return { appointmentBookHandler, getAppointmentsHandler };
}

export default AppointmentHandler