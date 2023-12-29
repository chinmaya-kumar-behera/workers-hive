import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilState } from "recoil";
import { ChatWindow } from "../../../atom/chatState";

const ChatHomeHeader = () => {
  const [isExpanded, setIsExpanded] = useRecoilState(ChatWindow);

  const onBtnClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
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
          className="w-full px-3 py-2 rounded-full focus:outline-none text-sm "
          placeholder="Search Chats"
        />
      </div>
    </div>
  );
};

export default ChatHomeHeader;
