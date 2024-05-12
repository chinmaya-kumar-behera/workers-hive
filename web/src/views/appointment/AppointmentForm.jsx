import React, { useState } from "react";
import Dialog from "../../components/ui/Dialog";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  appointmentModalState,
  appointmentStateData,
} from "../../atom/appointmentState";
import WorkerDetail from "./components/WorkerDetail";
import { MdCancel } from "react-icons/md";
import { AuthState } from "../../atom/authState";
import AppointmentHandler from "../../handler/AppointmentHandler";
import toast from 'react-hot-toast';
import AuthenticationHandler from "../../handler/AuthenticationHandler";

const AppointmentForm = () => {
  const [appointmentModal, setAppointmentModal] = useRecoilState(appointmentModalState);
  const [appointmentState] = useRecoilState(appointmentStateData);
  const authData = useRecoilValue(AuthState);
  const { setAuthDetails } = AuthenticationHandler();

  const { appointmentBookHandler } = AppointmentHandler();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const onClose = () => {
    setAppointmentModal(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleCancelImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const workerId = appointmentState.workerData._id;
    const userId = authData?._id;
    const obj = { description, workerId, userId, images };
    appointmentBookHandler(obj).then((res) => {
      toast.success("Appointment created successfully");
      onClose();
      setDescription("");
      setImages([]);
      console.log(res);
    });
  };

  return (
    <Dialog
      isOpen={appointmentModal}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-3xl lg:max-h-[500px] sm:rounded-lg p-5`}
      overlayClassName="backdrop-blur"
      closable={true}
    >
      <div className="w-full">
        <div className="bg-white">
          <h2 className="text-lg font-semibold text-center">
            Appointment Form
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row justify-between mt-5 gap-5"
        >
          <div className="w-full lg:w-2/3 lg:pr-5">
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 font-medium">
                Description:
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-1 font-medium">
                Reference Images:
              </label>
              <input
                type="file"
                id="image"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected_Image ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleCancelImage(index)}
                  >
                    <MdCancel />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none mt-4"
            >
              Submit
            </button>
          </div>
          <WorkerDetail appointmentState={appointmentState} />
        </form>
      </div>
    </Dialog>
  );
};

export default AppointmentForm;
