import React from "react";
import { CiUser } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  const navigate = useNavigate();

  const handleVisitProfile = () => {
    navigate(`/user/${data._id}`);
  };

  console.log(data);

  return (
    <div className="w-full flex gap-5 rounded-xl p-4 bg-gray-50 shadow-xl hover:shadow-lg">
      <div className="w-[100px] text-center">
        <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
          {data?.photo ? (
            <img
              alt="eEmployee_image"
              src={data?.photo}
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
      <div className="w-full flex items-start justify-between">
        <div className="w-3/5 p-2 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{data.name}</h3>
            <p className="text-sm">{data.description}</p>
          </div>

          <div className="mt-2">
            <h5 className="font-semibold">
              <span className="text-gray-500">Price :</span> {data?.price}
            </h5>
          </div>
          <div className="flex gap-2 items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-all">
              Book Appointment
            </button>
            <button className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-300 transition-all">
              Save for Later
            </button>
          </div>

          {/* <div className="flex justify-start items-center gap-3 mt-2">
            <FaStar className="text-3xl text-orange-500" />{" "}
            <h2 className="text-2xl font-bold">3.7</h2>
          </div> */}
        </div>
        <div className="w-2/5">
          <h3 className="font-semibold text-blue-400 text-md">
            Photos of work
          </h3>

          {data?.workingPhotos?.length > 0 ? (
            <div className="w-fit p-2 bg-gray-100 rounded mt-1">
              <div className="flex flex-wrap gap-2">
                {data?.workingPhotos?.map((value, index) => (
                  <img
                    key={index}
                    src={value}
                    className="h-[60px] w-[60px] object-cover object-center hover:scale-105 transition-all rounded"
                    alt="working-photos"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm py-2 text-red-400">Hasn't provided any photos !</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
