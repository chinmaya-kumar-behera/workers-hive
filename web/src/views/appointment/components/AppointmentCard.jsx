import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../../atom/authState";
import { TransactionDataState, TransactionModalState } from "../../../atom/transactionState";
import { MdVerified } from "react-icons/md";
import Accordion from "../../../components/ui/Accordion";
import { PhotoState } from "../../../atom/photoState";

const AppointmentCard = ({ appointment }) => {
  const userData = useRecoilValue(AuthState);
  const setTransactionModalState = useSetRecoilState(TransactionModalState);
  const setTransactionDataState = useSetRecoilState(TransactionDataState);
  const setPhotoModal = useSetRecoilState(PhotoState);

  const onPaymentClick = () => {
    setTransactionModalState(true);
    const { userId, workerId } = appointment;
    console.log(appointment);
    const amount = workerId.subCategory.price;
    setTransactionDataState({ sender: userId, receiver: workerId, amount, appointmentId:appointment._id });
  };

  return (
    <Accordion
      title={
        <div className="space-y-1">
          <div className="flex items-center gap-5 justify-between">
            <span className="text-blue-600 hover:text-black hover:underline text-md font-bold">
              ID : {appointment.appointmentId}
            </span>
            <span className="text-gray-700 hover:text-black hover:underline text-xs font-bold">
              STATUS : {appointment.status.toUpperCase()}
            </span>
          </div>
          <div className="">
            <div className="max-w-[300px] flex text-sm">
              <div className="flex items-center gap-1 ">
                {userData.role === "worker" && (
                  <React.Fragment>
                    <span className="text-gray-600">Customer :</span>{" "}
                    <span className=""> {appointment?.userId?.name}</span>
                  </React.Fragment>
                )}
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
            <span className="text-black">Description</span> :{" "}
            {appointment.description}.
          </p>
        </div>
        <div className="space-y-1">
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
          <hr />
          <div className="flex justify-start gap-2 bg-opacity-10">
            {
              <div className="">
                {appointment.paymentStatus === "PENDING" && (
                  <span className="text-sm font-semibold flex gap-2 items-center rounded-md underline py-1 text-red-500 border-red-500">
                    {userData.role !== "worker"
                      ? "Payment is not done by user"
                      : "Your payment is pending"}
                  </span>
                )}
                {appointment.paymentStatus === "SUCCESS" && (
                  <span className="text-sm font-semibold flex gap-2 items-center rounded-md border-2 px-3 py-1 bg-gray-200 shadow-sm shadow-green-500 border-green-500">
                    payment{" "}
                    <div className="flex gap-2 items-center">
                      <MdVerified className="text-lg text-green-500" />
                    </div>
                  </span>
                )}{" "}
              </div>
            }
            {appointment.userId.role !== "user" &&
              appointment.paymentStatus !== "SUCCESS" && (
                <div className="flex items-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md"
                    onClick={onPaymentClick}
                  >
                    Pay Now
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default AppointmentCard;
