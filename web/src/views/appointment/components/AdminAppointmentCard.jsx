import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../../atom/authState";
import { MdVerified } from "react-icons/md";
import Accordion from "../../../components/ui/Accordion";
import { PhotoState } from "../../../atom/photoState";
import { FaRegClock } from "react-icons/fa";
import moment from "moment";

const AdminAppointmentCard = ({ appointment }) => {
  const userData = useRecoilValue(AuthState);
  const setPhotoModal = useSetRecoilState(PhotoState);

  return (
    <Accordion
      title={
        <div className="space-y-1">
          <div className="flex items-center gap-5 justify-between">
            <div className="flex gap-5">
              <span className="text-blue-600 hover:text-black hover:underline text-md font-bold">
                ID : {appointment.appointmentId}
              </span>
              <span className="flex gap-2 items-center text-gray-600 hover:text-black hover:underline text-xs">
                <FaRegClock className="text-sm" />{" "}
                {moment(appointment.createdAt).fromNow()}
              </span>
            </div>
            <span className="text-gray-700 hover:text-black hover:underline text-xs font-bold">
              STATUS : {appointment.status.toUpperCase()}
            </span>
          </div>
          <div className="">
            <div className="max-w-[300px] flex text-sm">
              <div className="flex items-center gap-1 ">
                <React.Fragment>
                  <span className="text-gray-600">From :</span>{" "}
                  <span className="">
                    {appointment?.userId?._id === userData._id
                      ? "You"
                      : appointment?.userId?.name}
                  </span>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="relative space-y-2">
        <div className="text-gray-600">
          <p>
            <span className="text-black">Date</span> :{" "}
            {new Date(appointment.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="text-black">Description</span> :{" "}
            {appointment.description}.
          </p>
        </div>
        <div className="space-y-1">
          {appointment.appointmentPhotos.length !== 0 && (
            <React.Fragment>
              <div>
                <span className="text-xs text-blue-500">Attached photos</span>
              </div>
              <div className="w-fit flex gap-2 bg-gray-200 rounded-md p-1">
                {appointment.appointmentPhotos.map((photo) => (
                  <div
                    key={photo}
                    className=""
                    onClick={() => setPhotoModal({ isOpen: true, photo })}
                  >
                    <img
                      className="h-10 w-10 object-cover rounded-md hover:scale-105 transition-all duration-200 overflow-hidden"
                      src={photo}
                      alt="appo_photo"
                    />
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
          <hr />

          <div className="flex justify-start gap-2 bg-opacity-10">
            <div className="">
              {appointment.paymentStatus === "PENDING" && (
                <span className="text-sm font-semibold flex gap-2 items-center rounded-md underline py-1 text-red-500 border-red-500">
                  Payment is not done by user
                </span>
              )}

              {appointment.paymentStatus === "SUCCESS" && (
                <span className="text-sm font-semibold flex gap-2 items-center rounded-md border-2 px-3 py-1 bg-gray-200 shadow-sm shadow-green-500 border-green-500">
                  <MdVerified className="text-lg text-green-500" />
                  Payment done by user
                  <span className="text-green-500 underline cursor-pointer hover:text-green-400">
                    view Details
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default AdminAppointmentCard;
