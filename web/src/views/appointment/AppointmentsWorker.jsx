import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import ImageHandler from "../../handler/ImageHandler";
import AppointmentHandler from "../../handler/AppointmentHandler";
import AppointmentCard from "./components/AppointmentCard";
import { WorkerAppointments } from "../../atom/appointmentState";

const AppointmentsWorker = () => {
  const userData = useRecoilValue(AuthState);
  const { getWorkerAppointmentsHandler } = AppointmentHandler();

  const { convertImageURL } = ImageHandler();
  const workerAppointments = useRecoilValue(WorkerAppointments);
  console.log(workerAppointments);

  const getAppointments = (userId) => {
    getWorkerAppointmentsHandler();
  };

  useEffect(() => {
    if (userData._id) getAppointments(userData._id);
  }, [userData._id]);

  return (
    // <PageContainer className="mt-5 bg-transparent">
    //   <div className="flex gap-5">
    //     <div className="w-[15%] p-5 bg-white rounded-lg">
    //       <div className="">
    //         <div className=" overflow-hidden flex justify-center ">
    //           <div className="relative h-[100px] w-[100px]">
    //             <img
    //               className="mx-auto h-[100px] w-[100px] bg-red-100 rounded-full overflow-hidden object-cover object-center"
    //               src={userData?.photo && convertImageURL(userData.photo)}
    //               alt="profileImage"
    //             />
    //           </div>
    //         </div>
    //         <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
    //           {userData?.name}
    //         </h1>
    //       </div>
    //       <div className="mt-8">
    //         <div className="flex flex-col gap-1 text-white text-sm font-semibold">
    //           <div className=" px-5 py-2 rounded-lg cursor-pointer">
    //             Total appointments: {workerAppointments}
    //           </div>
    //           <div className="bg-red-500 px-5 py-2 rounded-lg cursor-pointer">
    //             Viewed: 5
    //           </div>
    //           <div className="bg-orange-500 px-5 py-2 rounded-lg cursor-pointer">
    //             Pending: 5
    //           </div>
    //           <div className="bg-green-500 px-5 py-2 rounded-lg cursor-pointer">
    //             Resolved: 5
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-[85%] grid grid-cols-1 gap-4 bg-white rounded-lg p-5">
    //       <div className="">
    //         <div className="">
    //           <h2 className="font-semibold text-2xl mb-3">
    //             Recent Appointments
    //           </h2>
    //         </div>
    //         <div className="space-y-3">
    //           {workerAppointments.appointments.map((appointment) => (
    //             <AppointmentCard
    //               key={appointment._id}
    //               appointment={appointment}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </PageContainer>
    <PageContainer className="mt-5 bg-transparent">
      <div className="flex gap-5">
        <div className="w-[20%] bg-white border-r">
          <div className="w-[80%] p-3">
            <div className="">
              <div className=" overflow-hidden flex justify-center ">
                <div className="relative h-[100px] w-[100px]">
                  <img
                    className="mx-auto h-[100px] w-[100px] bg-red-100 rounded-full overflow-hidden object-cover object-center"
                    src={userData?.photo && convertImageURL(userData.photo)}
                    alt="profileImage"
                  />
                </div>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                {userData?.name}
              </h1>
            </div>
            <div className="mt-3 bg-gray-50 rounded-lg text-gray-900">
              <div className="flex flex-col gap-1 text-sm font-semibold">
                <div className=" bg-indigo-100 px-2 py-2 rounded-lg cursor-pointer">
                  total appointments: {workerAppointments?.totalAppointments}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] grid grid-cols-1 gap-4 bg-white rounded-lg p-5">
          <div className="">
            <div className="mb-2">
              <h2 className="font-semibold text-2xl mb-3">Recent Appointments</h2>
            </div>
            <div className="space-y-2">
              {workerAppointments.appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AppointmentsWorker;
