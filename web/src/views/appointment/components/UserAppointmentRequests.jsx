import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import AppointmentHandler from "../../../handler/AppointmentHandler";
import { WorkerAppointments } from "../../../atom/appointmentState";
import { AuthState } from "../../../atom/authState";
import AdminAppointmentCard from "./AdminAppointmentCard";

const UserAppointmentRequests = () => {
  const workerAppointments = useRecoilValue(WorkerAppointments);
  const { getWorkerAppointmentsHandler } = AppointmentHandler();
  const userData = useRecoilValue(AuthState);

  const getAppointments = (userId) => {
    getWorkerAppointmentsHandler();
  };

  useEffect(() => {
    if (userData._id) getAppointments(userData._id);
  }, [userData._id]);
    
  return (
    <div className="w-full grid grid-cols-1 gap-4 rounded-lg p-5">
      <div className="">
        <div className="">
          <h2 className="font-semibold text-2xl mb-3">Recent Appointments</h2>
        </div>
        <div className="space-y-2">
          {workerAppointments.appointments.map((appointment) => (
            <AdminAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentRequests;
