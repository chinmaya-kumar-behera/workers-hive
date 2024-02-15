import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../../atom/authState";
import { FaUser } from "react-icons/fa";
import { SelectedChat } from "../../../atom/chatState";
import ImageHandler from "../../../handler/ImageHandler";

const ChatName = ({ data }) => {
  const authData = useRecoilValue(AuthState);
  const setSelectedChat = useSetRecoilState(SelectedChat);
  const user = data.users.find(value => value._id !== authData._id);
  const { convertImageURL } = ImageHandler();
  

  const onChatClick = () => {
    setSelectedChat({ room: data._id, user });
  };

  return (
    <div
      className="mt-4 space-y-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all"
      onClick={onChatClick}
    >
      <div className="flex gap-3">
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
          <h5 className="font-semibold text-md">{user.name}</h5>
          <p className="text-xs"> </p>
        </div>
      </div>
    </div>
  );
};

export default ChatName;
