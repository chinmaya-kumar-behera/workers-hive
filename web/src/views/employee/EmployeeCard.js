import React from "react";
import { FaStar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${data._id}`);
  };
  return (
    <div
      className="flex gap-5 rounded-xl p-4 bg-gray-50 border"
      onClick={handleClick}
    >
      <div className="overflow-hidden h-[100px] w-[100px]">
        {data?.photo ? (
          <img
            alt="eEmployee_image"
            src={data?.photo}
            className="h-full w-full object-center object-cover rounded-full"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 border rounded-full">
            <CiUser className="text-6xl text-blue-900" />
          </div>
        )}
      </div>
      <div className="">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">{data.name}</h3>
        </div>
        <p className="text-sm">{data.description}</p>
        {/* <div className="flex justify-start items-center gap-3 mt-2">
          <FaStar className="text-3xl text-orange-500" />{" "}
          <h2 className="text-2xl font-bold">3.7</h2>
        </div> */}

        <div className="mt-2">
          <h5 className="font-semibold">Price : {data?.price}</h5>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
