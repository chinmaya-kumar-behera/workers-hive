import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import AppointmentHandler from "../../handler/AppointmentHandler";
import ImageHandler from "../../handler/ImageHandler";
import { AuthState } from "../../atom/authState";
import PageContainer from "../../components/shared/PageContainer";
import { UserAppointments } from "../../atom/appointmentState";
import YourAppointments from "./components/YourAppointments";

const AppointmentsUser = () => {
  const userData = useRecoilValue(AuthState);
  const { getUserAppointmentsHandler } = AppointmentHandler();

  const { convertImageURL } = ImageHandler();
  const userAppointments = useRecoilValue(UserAppointments);

  const getAppointments = (userId) => {
    getUserAppointmentsHandler();
  };

  useEffect(() => {
    if (userData._id) getAppointments(userData._id);
  }, [userData._id]);

  return (
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
                  total appointments: {userAppointments?.totalAppointments}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <YourAppointments/>
        </div>
      </div>
    </PageContainer>
  );
};

export default AppointmentsUser;
