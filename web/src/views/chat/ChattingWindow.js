import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { ChatWindow, SelectedChat } from "../../atom/chatState"
import ChatHandler from "../../handler/ChatHandler";
import { AuthState } from "../../atom/authState";
import ChatList from "./components/ChatList";
import ChatHomeHeader from "./components/ChatHomeHeader";
import ChattingRoom from "./components/ChattingRoom";
import { useLocation } from "react-router-dom";

const ChattingWindow = () => {
  const { pathname } = useLocation();
  const { getUserChatsHandler } = ChatHandler();
  const isExpanded = useRecoilValue(ChatWindow);
  const authData = useRecoilValue(AuthState);
  const selectedChat = useRecoilValue(SelectedChat);
  const resetSelectedChat = useResetRecoilState(SelectedChat)
  const [chatNotFound, setChatNotFound] = useState(false);

  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    if (authData?._id) {
      getUserChatsHandler({ userId: authData._id })
        .then((res) => {
          // console.log(res.data.data);
          setChats(res.data.data);
          if (res.data.data === 0) {
            setChatNotFound(true);
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      resetSelectedChat();
    }
  }, [authData?._id]);

  const canVisible =
    pathname === "/" ||
    pathname.startsWith("/subcategory/") ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/categories");

    return (
      <div
        className={`fixed ${isExpanded ? "bottom-5" : "-bottom-[63%]"} ${
          !canVisible && "hidden"
        } right-5 h-[70%] w-[300px] bg-gray-100 border border-gray-300 z-20 rounded shadow-xl shadow-blue-50 px-3 py-2 transition-all duration-700`}
      >
        {selectedChat?.room ? (
          <ChattingRoom />
        ) : (
          <>
            <ChatHomeHeader />
            <ChatList chatNotFound={chatNotFound} data={chats} />
          </>
        )}
      </div>
    );
};

export default ChattingWindow;
