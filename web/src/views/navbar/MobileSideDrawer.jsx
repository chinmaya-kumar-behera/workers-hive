import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AuthenticationHandler from "../../handler/AuthenticationHandler";
import NavigationHandler from "../../handler/NavigationHandler";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../atom/authState";
import { MobileSidebarState } from "../../atom/mobileSidebar";
import { ChatWindow } from "../../atom/chatState";

const MobileSideDrawer = () => {
  const authData = useRecoilValue(AuthState);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(MobileSidebarState);

  const { navigateToSignInPage, navigateToHomePage } = NavigationHandler();
  const { logOutHandler } = AuthenticationHandler();

  const toggleSideBar = () => {
    setSideBarOpen((prev) => !prev);
  };
  const setChatWindowExpand = useSetRecoilState(ChatWindow);

  return (
    <div className="h-full relative">
      <div className="absolute top-0 right-0">
        <button className="p-1" onClick={toggleSideBar}>
          <RxCross2 className="text-xl" />
        </button>
      </div>

      <div className="h-full flex flex-col justify-between gap-2 ">
        <div className="space-y-2">
          <div className="">
            <button
              className="text-blue-600"
              onClick={() => {
                toggleSideBar();
                navigateToHomePage();
              }}
            >
              Home
            </button>
          </div>

          {authData?._id && (
            <div className="">
              <button
                className="text-blue-600"
                onClick={() => {
                  toggleSideBar();
                  setChatWindowExpand((prev) => !prev);
                }}
              >
                Chat
              </button>
            </div>
          )}
        </div>
        {authData?._id ? (
          <div className="">
            <button
              className="flex items-center justify-start bg-gray-500 bg-opacity-10 rounded-lg gap-3 px-4 py-2 w-full backdrop-blur-lg transition-all text-red-500 text-md font-semibold"
              onClick={logOutHandler}
            >
              logout <IoMdLogOut className="text-xl" />
            </button>
          </div>
        ) : (
          <div className="">
            <button
              className="flex items-center justify-start bg-blue-500 rounded-lg gap-3 px-4 py-2 w-full backdrop-blur-lg transition-all text-white text-md font-semibold"
              onClick={navigateToSignInPage}
            >
              <span className="flex items-center"> Sign in</span>{" "}
              <IoIosArrowRoundForward className="text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSideDrawer;
