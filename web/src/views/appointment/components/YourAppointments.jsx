import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../../atom/authState";
import AppointmentHandler from "../../../handler/AppointmentHandler";
import { UserAppointments } from "../../../atom/appointmentState";
import UserAppointmentCard from "./UserAppointmentCard";

const YourAppointments = () => {
  const userData = useRecoilValue(AuthState);
  const { getUserAppointmentsHandler } = AppointmentHandler();

  const userAppointments = useRecoilValue(UserAppointments);

  const getAppointments = (userId) => {
    getUserAppointmentsHandler();
  };

  useEffect(() => {
    if (userData._id) getAppointments(userData._id);
  }, [userData._id]);

  return (
    <div className="w-full grid grid-cols-1 gap-4 bg-white rounded-lg p-5">
      <div className="">
        <div className="mb-2">
          <h2 className="font-semibold text-2xl mb-3">Your Appointments</h2>
        </div>
        <div className="space-y-2">
          {userAppointments.appointments.map((appointment) => (
            <UserAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourAppointments;
