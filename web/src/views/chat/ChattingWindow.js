import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { ChatWindow, SelectedChat } from "../../atom/chatState"
import ChatHandler from "../../handler/ChatHandler";
import { AuthState } from "../../atom/authState";
import ChatList from "./components/ChatList";
import ChatHomeHeader from "./components/ChatHomeHeader";
import ChattingRoom from "./components/ChattingRoom";
import { useLocation } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";

const ChattingWindow = () => {
  const { pathname } = useLocation();
  const { getUserChatsHandler } = ChatHandler();
  const [isExpanded, setIsExpanded] = useRecoilState(ChatWindow);
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
    };
  }, [authData?._id, isExpanded]);

  const canVisible =
    pathname === "/" ||
    pathname.startsWith("/subcategory/") ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/categories");

  return (
    <>
      <div
        className={`fixed ${isExpanded ? "bottom-0 lg:bottom-5" : "-bottom-[100%] lg:-bottom-[63%]"} ${
          !canVisible && "hidden"
        } right-0 lg:right-5 h-full lg:h-[70%] w-full lg:w-[300px] bg-gray-100 border border-gray-300 z-20 rounded shadow-xl shadow-blue-50 px-3 py-2 transition-all duration-700`}
      >
        {selectedChat?.room ? (
          <ChattingRoom />
        ) : (
          <>
            <ChatHomeHeader />
            <ChatList chatNotFound={chatNotFound} data={chats} />
          </>
        )}
        <button
          className="fixed bottom-5 right-5 lg:hidden bg-blue-500 text-white rounded-full p-3 shadow-lg z-0"
          onClick={() => setIsExpanded(prev=>!prev)}
        >
          <AiOutlineMessage size={24} />
        </button>
      </div>
    </>
  );
};

export default ChattingWindow;




// import React, { useEffect, useState } from "react";
// import { useRecoilValue, useResetRecoilState } from "recoil";
// import { ChatWindow, SelectedChat } from "../../atom/chatState";
// import ChatHandler from "../../handler/ChatHandler";
// import { AuthState } from "../../atom/authState";
// import ChatList from "./components/ChatList";
// import ChatHomeHeader from "./components/ChatHomeHeader";
// import ChattingRoom from "./components/ChattingRoom";
// import { useLocation } from "react-router-dom";
// import { AiOutlineMessage } from "react-icons/ai";

// const ChattingWindow = () => {
//   const { pathname } = useLocation();
//   const { getUserChatsHandler } = ChatHandler();
//   const isExpanded = useRecoilValue(ChatWindow);
//   const authData = useRecoilValue(AuthState);
//   const selectedChat = useRecoilValue(SelectedChat);
//   const resetSelectedChat = useResetRecoilState(SelectedChat);
//   const [chatNotFound, setChatNotFound] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [isChatVisible, setIsChatVisible] = useState(false);

//   useEffect(() => {
//     if (authData?._id) {
//       getUserChatsHandler({ userId: authData._id })
//         .then((res) => {
//           setChats(res.data.data);
//           if (res.data.data === 0) {
//             setChatNotFound(true);
//           }
//         })
//         .catch((err) => console.log(err));
//     }

//     return () => {
//       resetSelectedChat();
//     };
//   }, [authData?._id, isExpanded]);

//   const canVisible =
//     pathname === "/" ||
//     pathname.startsWith("/subcategory/") ||
//     pathname.startsWith("/category/") ||
//     pathname.startsWith("/user") ||
//     pathname.startsWith("/categories");

//   const toggleChatVisibility = () => {
//     setIsChatVisible((prevState) => !prevState);
//   };

//   return (
//     <>
//       <div
//         className={`fixed bottom-0 right-0 h-full lg:h-[70%] w-full lg:w-[300px] bg-gray-100 border border-gray-300 z-20 rounded shadow-xl shadow-blue-50 px-3 py-2 transition-all duration-700 ${
//           !isChatVisible && "hidden lg:block"
//         }`}
//       >
//         {selectedChat?.room ? (
//           <ChattingRoom />
//         ) : (
//           <>
//             <ChatHomeHeader />
//             <ChatList chatNotFound={chatNotFound} data={chats} />
//           </>
//         )}
//       </div>
      // <button
      //   className="fixed bottom-5 right-5 lg:hidden bg-blue-500 text-white rounded-full p-3 shadow-lg"
      //   onClick={toggleChatVisibility}
      // >
      //   <AiOutlineMessage size={24} />
      // </button>
//     </>
//   );
// };

// export default ChattingWindow;
