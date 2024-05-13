import React from "react";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../../atom/authState";

const AppointmentCard = ({ appointment }) => {
    const userData = useRecoilValue(AuthState);

  return (
    <div
      key={appointment._id}
      className="bg-gray-100 p-6 shadow-md hover:shadow-blue-200 rounded-lg space-y-3"
    >
      <div className="">
        <div className="">
          <div className="flex gap-5">
            <span className="">
              <strong>Appointment ID:</strong> APP00000002
            </span>
            <span className="">
              Appointment Status:{" "}
              <span className=" text-red-500 py-1 rounded-md">Pending</span>
            </span>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex justify-between  gap-5 rounded-md">
        <div className="w-fit rounded-lg">
          <div className="mb-4">
            <div className="mb-2">
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {appointment.description}
              </p>
            </div>
            <div className="flex gap-2 ">
              {appointment.appointmentPhotos.map((photo) => (
                <div key={photo} className="">
                  <img
                    className="h-16 w-16 rounded-md hover:scale-105 transition-all duration-200 overflow-hidden"
                    src={photo}
                    alt="appo_photo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {userData.role !== "worker" ? (
          <div className="">
            <div className="text-center mb-2">
              <h3 className="text-md">Your Technician</h3>
            </div>
            <div className="max-w-[300px] flex p-3 bg-blue-100 border rounded-xl">
              <img
                src="http://localhost:5000/images/profilePic_1715537851898.webp"
                alt="Worker's_Photo"
                className="w-14 h-14 rounded-full overflow-hidden mr-4"
              />
              <div className="">
                <h2 className="text-lg">Chinmaya Behera</h2>
                <p className="text-sm text-gray-600">
                  {appointment.workerId.category.heading} /{" "}
                  {appointment.workerId.subCategory?.heading}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="text-center mb-2">
              <h3 className="text-md">Customer Details</h3>
            </div>
            <div className="max-w-[300px] flex p-3 bg-blue-100 border rounded-xl">
              <img
                src={appointment?.userId?.photo}
                alt="Worker's_Photo"
                className="w-14 h-14 rounded-full overflow-hidden mr-4"
              />
              <div className="">
                <h2 className="text-lg">{appointment?.userId?.name}</h2>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-start gap-2 bg-opacity-10">
        <span className="font-semibold flex gap-2 items-center rounded-md">
          Payment Status:{" "}
          <div className="flex gap-2 items-center">
            <span className="text-red-500">Pending</span>
          </div>
        </span>
        {userData.role !== "worker" && (
          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
