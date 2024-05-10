import React from 'react'
import { IoIosArrowRoundForward, IoMdLogOut } from 'react-icons/io';
import AuthenticationHandler from '../../handler/AuthenticationHandler';
import NavigationHandler from '../../handler/NavigationHandler';
import { RxCross2 } from 'react-icons/rx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatWindow } from '../../atom/chatState';
import { AuthState } from '../../atom/authState';

const MobileSideDrawer = ({ sideBarOpen, toggleSideBar }) => {
  const { navigateToSignInPage, navigateToHomePage } = NavigationHandler();
  const { logOutHandler } = AuthenticationHandler();
  const setChatWindowExpand = useSetRecoilState(ChatWindow);
  const authData = useRecoilValue(AuthState);

  return (
    <aside
      className={`${
        sideBarOpen ? "left-1/3" : "left-[100%]"
      } fixed top-0 w-2/3 transition-all duration-500 h-full bg-gradient-to-br from-blue-200 to-blue-100 z-90 p-5`}
    >
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
    </aside>
  );
};

export default MobileSideDrawer