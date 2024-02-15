import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedChat } from "../../../atom/chatState";
import { IoArrowBack } from "react-icons/io5";
import ChatsContainer from "./ChatsContainer";
import ImageHandler from "../../../handler/ImageHandler";

const ChattingRoom = () => {
  const selectedChat = useRecoilValue(SelectedChat);
  const resetSelectedChat = useSetRecoilState(SelectedChat);
  const { user } = selectedChat;
  const { convertImageURL } = ImageHandler();

  useEffect(() => {}, []);

  const onBackClick = () => {
    resetSelectedChat();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 items-center border-b pb-2 border-gray-200">
        <div className="flex items-center">
          <button
            className="hover:bg-gray-200 p-1 rounded-full transition-all"
            onClick={onBackClick}
          >
            <IoArrowBack className="text-xl hover:text-gray-800 text-gray-900" />
          </button>
        </div>
        <div className="h-[40px] w-[40px] overflow-hidden">
          {user?.photo ? (
            <img
              alt={"dp_image"}
              src={convertImageURL(user.photo)}
              className="h-full w-full object-center object-cover rounded-full"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 rounded-full flex justify-center items-center">
              <FaUser className="text-2xl" />
            </div>
          )}
        </div>
        <div className="space-y-.5">
          <h5 className="font-bold text-md">{user.name.split(" ")[0]}</h5>
          <p className="text-xs"> </p>
        </div>
      </div>

      {/* chat container */}
      <div className="h-full">
        <ChatsContainer selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChattingRoom;
