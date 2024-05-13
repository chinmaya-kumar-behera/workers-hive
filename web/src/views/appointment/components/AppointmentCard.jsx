import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../../atom/authState";
import { TransactionDataState, TransactionModalState } from "../../../atom/transactionState";
import { MdVerified } from "react-icons/md";

const AppointmentCard = ({ appointment }) => {
  const userData = useRecoilValue(AuthState);
  const setTransactionModalState = useSetRecoilState(TransactionModalState);
  const setTransactionDataState = useSetRecoilState(TransactionDataState);

  const onPaymentClick = () => {
    setTransactionModalState(true);
    const { userId, workerId } = appointment;
    console.log(appointment);
    const amount = workerId.subCategory.price;
    setTransactionDataState({ sender: userId, receiver: workerId, amount, appointmentId:appointment._id });
  };

  return (
    <div
      key={appointment._id}
      className="bg-gray-100 p-4 shadow-lg hover:shadow-blue-200 rounded-lg space-y-3 text-md"
    >
      <div className="">
        <div className="">
          <div className="flex gap-5 ">
            <span className="bg-gray-50 px-2 py-1 rounded-md cursor-pointer">
              Appointment ID :{" "}
              <span className="font-semibold">
                {" "}
                {appointment.appointmentId}
              </span>
            </span>
            <span className="cursor-pointer bg-gray-50 px-2 py-1 rounded-md">
              Application Status :{" "}
              <span className="py-1 rounded-md bg-gray-50">
                {appointment.status}
              </span>
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
              {/* <h3 className="text-md">Worker</h3> */}
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
        {(
          <div className="">
            {appointment.paymentStatus === "PENDING" && (
              <span className="text-sm font-semibold flex gap-2 items-center rounded-md underline px-3 py-1 text-red-500 border-red-500">
                {userData.role === "worker" ? "Payment is not done" : "Your payment is not done"}
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
        )}
        {userData.role !== "worker" &&
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
  );
};

export default AppointmentCard;
