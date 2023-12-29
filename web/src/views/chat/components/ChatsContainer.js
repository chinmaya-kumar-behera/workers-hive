import React, { useEffect, useState, useRef } from "react";
import { PiTelegramLogo } from "react-icons/pi";
import { useRecoilValue } from "recoil";
import ChatHandler from "../../../handler/ChatHandler";
import { AuthState } from "../../../atom/authState";
import { socket } from "../../../socket/soket";
import Loader from "../../../components/ui/Loader";

const ChatsContainer = ({ selectedChat }) => {
  const { createMessageHandler, getMessagesHandler } = ChatHandler();
  const [messages, setMessages] = useState([{ message: "Hii chinmaya" }]);
  const [message, setMessage] = useState("");
  const authData = useRecoilValue(AuthState);
  const [socketConnected, setSocketConnected] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const chatContainerRef = useRef(null);
  const shouldScrollRef = useRef(false);

  const onKeyDownhandler = (e) => {
    if (e.key === "Enter") {
      onSendHandler();
    }
  };

  const onSendHandler = () => {
    const messageData = {
      sender: authData._id,
      content: message,
      chat: selectedChat.room,
      readBy: [],
    };
    createMessageHandler(messageData)
      .then((res) => {
        setMessages((prev) => [...prev, res.data.data]);
        setMessage("");
        socket.emit("new message", res.data.data);
        shouldScrollRef.current = true; // Set the flag to scroll after the next render
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    socket.emit("setup", authData);
    socket.emit("join chat", selectedChat.room);
    socket.on("connection", () => {
      setSocketConnected(true);
    });

    socket.on("message", (data) => {
      if (socketConnected) {
        setMessages((prev) => [...prev, data]);
        shouldScrollRef.current = true; // Set the flag to scroll after the next render
      }
    });

    return () => {
      socket.off("connection");
      socket.off("message");
    };
  }, []);

  const getMessages = (page) => {
    getMessagesHandler({ chat: selectedChat.room, page })
      .then((res) => {
        setMessages(res.data.data);
        setPage(res.data.currentPage);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMessages(page);
  }, [selectedChat.room]);

  useEffect(() => {
    if (shouldScrollRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      shouldScrollRef.current = false; 
    }
  }, [messages]);

  const isSender = (data) => {
    return data?.sender?._id === authData?._id;
  };

  const fetchMoreChat = () => {
    getMessagesHandler({ chat: selectedChat.room, page: page + 1 })
      .then((res) => {
        setMessages((prev) => [...res.data.data, ...prev]);
        setPage(res.data.currentPage);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-full flex flex-col items-between">
      <div
        ref={chatContainerRef}
        className="h-full max-h-[420px] space-y-1 overflow-y-scroll no-scrollbar py-1"
      >
        <div className="flex justify-center">
          {page < totalPage && (
            <button
              className="bg-blue-400 px-3 py-1.5 text-xs rounded-full my-1 text-white"
              onClick={fetchMoreChat}
            >
              Load Previous
            </button>
          )}
        </div>
        {messages.length === 0 ? (
          // <Loader />
        null
        ) : (
          messages.map((value, index) => (
            <div
              key={index}
              className={`flex ${
                isSender(value) ? "justify-end" : "justify-satrt"
              }`}
            >
              <span
                className={`px-2 py-1  rounded-md  ${
                  isSender(value) ? "bg-blue-200" : "bg-white"
                }`}
              >
                {value.content}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center gap-1 py-2">
        <input
          type="text"
          className="w-full py-1.5 px-2.5 rounded-full text-sm outline-none"
          placeholder="Chat.."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={onKeyDownhandler}
        />
        <div className="">
          <button
            onClick={onSendHandler}
            className="flex justify-center items-center bg-blue-500 px-3 py-2 rounded-full"
          >
            <PiTelegramLogo className="text-white text-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatsContainer;
