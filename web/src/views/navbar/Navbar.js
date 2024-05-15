import React, { useEffect, useState } from "react";
import NavigationHandler from "../../handler/NavigationHandler";
import AuthenticationHandler from "../../handler/AuthenticationHandler";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../../atom/authState";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../Assets/Logo/logo.jpg";
import { ChatWindow } from "../../atom/chatState";
import { MobileSidebarState } from "../../atom/mobileSidebar";
import MobileSideDrawer from "./MobileSideDrawer";
import MenuItems from "./MenuItems";
import { IoIosArrowRoundForward, IoMdLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const authData = useRecoilValue(AuthState);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();
  const { query } = useParams();
  const setChatWindowExpand = useSetRecoilState(ChatWindow);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(MobileSidebarState);

  useEffect(() => {
    setSearchQuery(query);
  }, []);

  const {
    navigateToServiceProviderPage,
    navigateToSignInPage,
    navigateToHomePage,
  } = NavigationHandler();
  const { logOutHandler } = AuthenticationHandler();

  const handleSearchClick = () => {
    if (!searchQuery?.trim()) return;
    navigate(`/search/${searchQuery}`);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSearchClick();
  }

  const toggleSideBar =()=>{
    setSideBarOpen((prev) => !prev);
  }

  return (
    <nav className="sticky flex items-center top-0 px-2 md:px-5 bg-white z-20 h-[50px] md:h-[70px]">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between lg:items-center">
        {/* Left section of the header */}
        <div className="flex justify-between items-center w-full lg:w-fit gap-2">
          <div className="flex justify-between items-center gap-3">
            <div
              className="w-[150px] max-w-[150px] lg:w-[230px] lg:max-w-[230px] h-[40px] md:h-[50px] lg:h-[50px]"
              onClick={navigateToHomePage}
            >
              <img
                className="h-full w-full object-cover object-center rounded-lg"
                alt="logo"
                src={logo}
              />
            </div>

            <div className="w-full lg:ml-5 relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="min-w-full w-full lg:w-[450px] px-4 py-2 bg-blue-50 rounded-md outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span
                className="-translate-x-[35px] bg-blue-100 p-1.5 rounded-full hover:bg-blue-700 transition-all hover:text-white group hover:shadow-xl"
                onClick={handleSearchClick}
              >
                <CiSearch className="text-md lg:text-lg text-blue-800 group-hover:text-white" />
              </span>
            </div>
          </div>

          <div className="lg:hidden">
            <FaUserCircle className="text-4xl" onClick={toggleSideBar} />
          </div>
        </div>

        {/* Right section of the header */}
        <div className="hidden lg:flex items-center gap-4">
          {authData?._id && authData?.role === "user" && (
            <div className="text-gray-900">
              <span
                className="cursor-pointer text-gray-600 w-fit"
                onClick={navigateToServiceProviderPage}
              >
                Become a service provider !
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 px-5">
            <button className="text-blue-600" onClick={navigateToHomePage}>
              {/* <CiHome className="text-lg" /> */}
              Home
            </button>
            {authData?._id && (
              <button
                className="text-blue-600"
                onClick={() => setChatWindowExpand((prev) => !prev)}
              >
                Chat
              </button>
            )}
          </div>
          <MenuItems />
        </div>

        {/* overlay for side drawer */}
        {sideBarOpen && (
          <div className="absolute top-0 left-0 min-h-screen w-full bg-gray-900 bg-opacity-80 transition-all duration-500" />
        )}
        {/* side drawer for mobile screen */}
        <aside
          className={`${
            sideBarOpen ? "left-1/3" : "left-[100%]"
          } fixed top-0 w-2/3 transition-all duration-500 h-full bg-gradient-to-br from-blue-200 to-blue-100 z-90 p-5`}
        >
          <MobileSideDrawer />
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
