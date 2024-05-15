import React, { useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import ImageHandler from "../../handler/ImageHandler";
import AdminAppointmentsDetails from "./components/AdminAppointmentsDetails";
import { FaClipboardUser } from "react-icons/fa6";
import YourAppointments from "./components/YourAppointments";
import AppointmentHistory from "./components/AppointmentHistory";
import UserAppointmentRequests from "./components/UserAppointmentRequests";

const AppointmentsWorker = () => {
  const userData = useRecoilValue(AuthState);
  const { convertImageURL } = ImageHandler();
  const [route, setRoute] = useState("your");

  const renderComponent = () => {
    switch (route) {
      case "user":
        return <YourAppointments />
      case "history":
        return <AppointmentHistory />;
      case "your":
        return <UserAppointmentRequests />;
      default:
        return null;
    }
  }

  return (
    <PageContainer className="mt-5 bg-transparent min-h-screen">
      <div className="w-full bg-blue-300 flex gap-5">
        <div className="w-[350px] bg-white border-r ">
          <div className="w-[100%] p-3 space-y-5">
            <div className="flex gap-5 bg-gray-50 p-3 rounded-xl">
              <div className=" overflow-hidden flex justify-center ">
                <div className="relative h-[100px] w-[100px]">
                  <img
                    className="mx-auto h-[100px] w-[100px] bg-red-100 rounded-full overflow-hidden object-cover object-center"
                    src={userData?.photo && convertImageURL(userData.photo)}
                    alt="profileImage"
                  />
                </div>
              </div>
              <div className="">
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {userData?.name}
                </h1>
                <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 text-blue-500 rounded-lg">
                  {userData?.role} <FaClipboardUser />
                </button>
              </div>
            </div>

            <div className="">
              <AdminAppointmentsDetails/>
            </div>

            <div className="mt-3 rounded-lg text-gray-900 space-y-2">
              <button
                className={`w-full ${
                  route === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-blue-500"
                } px-2 py-2 rounded-lg cursor-pointer`}
                onClick={() => setRoute("user")}
              >
                Your Appointments
              </button>
              <button
                className={`w-full ${
                  route === "your"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-blue-500"
                } px-2 py-2 rounded-lg cursor-pointer`}
                onClick={() => setRoute("your")}
              >
                Customers Appointments
              </button>
              <button
                className={`w-full ${
                  route === "history"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-blue-500"
                } px-2 py-2 rounded-lg cursor-pointer`}
                onClick={() => setRoute("history")}
              >
                Appointments History
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">{renderComponent()}</div>
      </div>
    </PageContainer>
  );
};

export default AppointmentsWorker;
