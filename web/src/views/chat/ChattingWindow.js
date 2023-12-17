import React, { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import mrunal from "../../mrunal-thakur.jpg";

const ChattingWindow = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 h-[70%] w-[300px] bg-gray-100 z-20 rounded shadow-lg px-3 py-2">
      <div className="">
        <div className="space-y-1">
          <span className="font-semibold text-lg">Chats</span>
          <div className="">
            <input
              type="text"
              className="w-full px-3 py-1.5 rounded-full focus:outline-none text-sm "
              placeholder="Search Chats"
            />
          </div>
        </div>

        <div className="mt-3 space-y-2">
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
