import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import NavigationHandler from "../handler/NavigationHandler";
import AuthenticationHandler from "../handler/AuthenticationHandler";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthState } from "../atom/authState";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Assets/Logo/logo.jpg";
import { BiLogOutCircle } from "react-icons/bi";
import { ChatWindow } from "../atom/chatState";
import { RxCross2 } from "react-icons/rx";


const Navbar = () => {
  const authData = useRecoilValue(AuthState);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();
  const { query } = useParams();
  const setChatWindowExpand = useSetRecoilState(ChatWindow);
  const [sideBarOpen, setSideBarOpen] = useState(false);


  useEffect(() => {
    setSearchQuery(query);
  }, []);

  const { navigateToAdminPanel, navigateToSignInPage, navigateToServiceProviderPage, navigateToHomePage, navigateToProfilePage } = NavigationHandler();
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
              className="max-w-[80px] lg:max-w-[200px] h-[40px] md:h-[50px] lg:h-[50px]"
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
          {authData?._id && (
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
          <div className="">
            {authData?._id ? (
              <div className="">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <div className="flex items-center gap-2 bg-blue-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer">
                      <div className="">
                        <FaRegUserCircle className="text-3xl text-white" />
                      </div>
                      <div className="">
                        <h4 className="text-gray-100 text-sm font-semibold">
                          {authData.name}
                        </h4>
                        <h5 className="text-gray-100 text-xs font-semibold">
                          {authData.email}
                        </h5>
                      </div>
                    </div>
                  </MenuHandler>
                  <MenuList className="relative w-[200px] right-10 z-[21] bg-gray-100 py-3 px-2 space-y-1">
                    <div className="absolute left-[85%] -top-2 h-4 w-4 -rotate-45 bg-gray-100"></div>
                    <MenuItem
                      className="w-full flex justify-start items-center gap-3 bg-blue-100 p-2"
                      onClick={navigateToProfilePage}
                    >
                      <FaUserCircle className="text-xl" />
                      <span className="text-[16px]">Profile</span>
                    </MenuItem>

                    {authData.role === "admin" && (
                      <MenuItem
                        className="w-full flex justify-start items-center gap-3 bg-blue-100 p-2"
                        onClick={navigateToAdminPanel}
                      >
                        Admin Panel
                      </MenuItem>
                    )}
                    <MenuItem
                      className="w-full flex justify-start items-center gap-3 bg-blue-100 p-2"
                      onClick={logOutHandler}
                    >
                      <BiLogOutCircle className="text-xl" />{" "}
                      <span className="text-[16px]">Logout</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : (
              <button
                className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-3 rounded-md"
                onClick={navigateToSignInPage}
              >
                Sign In
                <CgProfile className="text-xl text-gray-800" />
              </button>
            )}
          </div>
        </div>

        {/* overlay for side drawer */}
        {sideBarOpen && (
          <div className="absolute top-0 left-0 min-h-screen w-full bg-gray-900 bg-opacity-80 transition-all duration-500" />
        )}
        {/* side drawer for mobile screen */}
        <aside
          className={`${
            sideBarOpen ? "left-1/3" : "left-[100%]"
          } fixed top-0 w-2/3 transition-all duration-500 h-full bg-gradient-to-br from-blue-200 to-blue-100 z-20 p-5`}
        >
          <div className="relative">
            <div className="absolute top-0 right-0">
              <button className="p-1" onClick={toggleSideBar}>
                <RxCross2 className="text-xl" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
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
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
