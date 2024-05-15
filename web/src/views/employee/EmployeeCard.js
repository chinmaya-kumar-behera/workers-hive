import React from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ImageHandler from "../../handler/ImageHandler";
import { useSetRecoilState } from "recoil";
import { appointmentModalState, appointmentStateData } from "../../atom/appointmentState";

const EmployeeCard = ({ data }) => {
  const navigate = useNavigate();
  const { convertImageURL } = ImageHandler();
  const setAppointmentModalState = useSetRecoilState(appointmentModalState);
  const setAppointmentStateData = useSetRecoilState(appointmentStateData);
  
  const handleVisitProfile = () => {
    navigate(`/user/${data._id}`);
  };

  const bookAppointment = (data) => {
    setAppointmentModalState(true);
    setAppointmentStateData({ workerData: data });
  }

  const saveForLater =()=>{
    console.log('save for later');
  }

  return (
    <div className="w-full flex gap-5 rounded-xl p-4 bg-gray-50 shadow-xl hover:shadow-lg">
      
      {/* Profile Photo and View profile */}
      <div className="w-[100px] text-center">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
          {data?.photo ? (
            <img
              alt="eEmployee_image"
              src={convertImageURL(data.photo)}
              className="min-h-[100px] min-w-[100px] object-center object-cover rounded-full"
            />
          ) : (
            <div className="min-h-[100px] min-w-[100px] flex items-center justify-center bg-gray-200 rounded-full">
              <CiUser className="text-6xl text-blue-900" />
            </div>
          )}
        </div>

        <button
          className="text-sm underline text-green-600 mt-2 hover:text-green-700"
          onClick={handleVisitProfile}
        >
          Visit profile
        </button>
      </div>

      <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row items-start justify-between">
        <div className="w-full lg:w-3/5 p-0 lg:p-2 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{data.name}</h3>
            <p className="text-sm">{data.description}</p>
          </div>

          <div className="mt-2">
            <h5 className="font-semibold">
              <span className="text-gray-500">Price :</span> {data?.price}
            </h5>
          </div>
          <div className="flex flex-wrap gap-2 lg:items-center">
            <button className="px-2 lg:px-4 py-1 lg:py-2 text-sm lg:text-lg bg-blue-500 text-white rounded hover:bg-blue-400 transition-all" onClick={()=>bookAppointment(data)}>
              Book Appointment
            </button>
            <button className="px-2 lg:px-4 py-1 lg:py-2 text-sm lg:text-lg bg-orange-400 text-white rounded hover:bg-orange-300 transition-all" onClick={saveForLater}>
              Save for Later
            </button>
          </div>
        </div>

        {/* work phootos */}
        <div className="w-full lg:w-2/5">
          <h3 className="font-semibold text-blue-400 text-md">
            Photos of work
          </h3>

          {data?.workingPhotos?.length > 0 ? (
            <div className="w-fit p-2 bg-gray-100 rounded mt-1">
              <div className="flex flex-wrap gap-2">
                {data?.workingPhotos?.map((value, index) => (
                  <img
                    key={index}
                    src={convertImageURL(value)}
                    className="h-[60px] w-[60px] object-cover object-center hover:scale-105 transition-all rounded"
                    alt="working-photos"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm py-2 text-red-400">
              Hasn't provided any photos !
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
