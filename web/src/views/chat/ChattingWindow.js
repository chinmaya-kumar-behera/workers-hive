import React, { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import mrunal from "../../mrunal-thakur.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";

const ChattingWindow = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onBtnClick = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div
      className={`fixed ${
        isExpanded ? "bottom-5" : "-bottom-[64%]"
      } right-5 h-[70%] w-[300px] bg-gray-100 border border-gray-300 z-20 rounded shadow-xl shadow-blue-50 px-3 py-2 transition-all duration-700`}
    >
      <div className="">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Chats</span>
            <button
              className={`mr-3 ${isExpanded ? "" : "rotate-180"} hover:bg-gray-200 rounded-full p-1 transition-all`}
              onClick={onBtnClick}
            >
              <MdKeyboardArrowDown className="text-xl" />
            </button>
          </div>
          <div className="">
            <input
              type="text"
              className="w-full px-3 py-1.5 rounded-full focus:outline-none text-sm "
              placeholder="Search Chats"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <div className="h-[40px] w-[40px] overflow-hidden">
              <img
                alt={"dp_image"}
                src={mrunal}
                className="h-full w-full object-center object-cover rounded-full"
              />
            </div>
            <div className="space-y-.5">
              <h5 className="font-semibold text-md">Chinmaya kumar behera</h5>
              <p className="text-xs"> hello </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-[45px] w-[45px] overflow-hidden">
              <img
                alt={"dp_image"}
                src={mrunal}
                className="h-full w-full object-center object-cover rounded-full"
              />
            </div>
            <div className="space-y-.5">
              <h5 className="font-semibold text-md">Chinmaya kumar behera</h5>
              <p className="text-xs"> hello </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-[45px] w-[45px] overflow-hidden">
              <img
                alt={"dp_image"}
                src={mrunal}
                className="h-full w-full object-center object-cover rounded-full"
              />
            </div>
            <div className="space-y-.5">
              <h5 className="font-semibold text-md">Chinmaya kumar behera</h5>
              <p className="text-xs"> hello </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingWindow;
