import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import ImageHandler from "../../handler/ImageHandler";
import AppointmentHandler from "../../handler/AppointmentHandler";
import AppointmentCard from "./components/AppointmentCard";

const AppointmentsWorker = () => {
  const userData = useRecoilValue(AuthState);
  const { getWorkerAppointmentsHandler } = AppointmentHandler();

  const { convertImageURL } = ImageHandler();
  const [appointments, setAppointments] = useState([])

  const getAppointments = (userId) => {
    getWorkerAppointmentsHandler({userId})
      .then((res) => {
        console.log(res.data.data);
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData._id) getAppointments(userData._id);
  }, [userData._id]);

  return (
    <PageContainer className="mt-5 bg-transparent">
      <div className="flex gap-5">
        <div className="w-[15%] p-5 bg-white rounded-lg">
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
          <div className="mt-8">
            <div className="flex flex-col gap-1 text-white text-sm font-semibold">
              <div className=" bg-red-500 px-5 py-2 rounded-lg cursor-pointer">
                Rejected: 3
              </div>
              <div className="bg-red-500 px-5 py-2 rounded-lg cursor-pointer">
                Viewed: 5
              </div>
              <div className="bg-orange-500 px-5 py-2 rounded-lg cursor-pointer">
                Pending: 5
              </div>
              <div className="bg-green-500 px-5 py-2 rounded-lg cursor-pointer">
                Resolved: 5
              </div>
            </div>
          </div>
        </div>
        <div className="w-[85%] grid grid-cols-1 gap-4 bg-white rounded-lg p-5">
          <div className="">
            <div className="">
              <h2 className="font-semibold text-2xl mb-3">
                Recent Appointments
              </h2>
            </div>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AppointmentsWorker;
