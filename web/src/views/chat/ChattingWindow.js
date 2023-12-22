import React, { useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";
import mrunal from "../../mrunal-thakur.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilState } from "recoil";
import { ChatWindow } from "../../atom/chatState";

import socketIo from "socket.io-client";
const socket = socketIo.connect("http://localhost:3000");

const ChattingWindow = () => {
  const [isExpanded, setIsExpanded] = useRecoilState(ChatWindow);

  const onBtnClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    socket.emit("user-join", { message: "Hello, server! Please join Me !" });
    socket.on("chat-message", (param) => {
      console.log("chat-message");
      console.log(param);
    });

    return () => {
      socket.off("join-request");
    };
  }, []);

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
              className={`mr-3 ${
                isExpanded ? "" : "rotate-180"
              } hover:bg-gray-200 rounded-full p-1 transition-all`}
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
      </div>
    </div>
  );
};

export default ChattingWindow;
