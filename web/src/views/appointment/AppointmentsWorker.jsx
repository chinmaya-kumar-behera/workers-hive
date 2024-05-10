import React from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import ImageHandler from "../../handler/ImageHandler";

const AppointmentsWorker = () => {
  const userData = useRecoilValue(AuthState);
  const { convertImageURL } = ImageHandler();

  const appointments = [
    { id: 1, status: "Pending" },
    { id: 2, status: "Rejected" },
    { id: 3, status: "Resolved" },
  ];

  const profile = {
    rejected: 2,
    viewed: 5,
    resolved: 3,
    ratings: 4.5,
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      case "Resolved":
        return "text-green-600";
      default:
        return "";
    }
  };
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
                Rejected: {profile.rejected}
              </div>
              <div className="bg-red-500 px-5 py-2 rounded-lg cursor-pointer">
                Viewed: {profile.viewed}
              </div>
              <div className="bg-orange-500 px-5 py-2 rounded-lg cursor-pointer">
                Pending: {profile.viewed}
              </div>
              <div className="bg-green-500 px-5 py-2 rounded-lg cursor-pointer">
                Resolved: {profile.resolved}
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
              <hr />
            </div>
            <div className="space-y-2">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white p-6 shadow-md  hover:shadow-blue-200 rounded-lg"
                >
                  <div className="flex justify-between mb-4">
                    <div className="text-xl font-semibold">
                      Appointment ID: {appointment.id}
                    </div>
                    <div
                      className={`text-sm ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </div>
                  </div>
                  {/* Add more details about the appointment as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AppointmentsWorker;
