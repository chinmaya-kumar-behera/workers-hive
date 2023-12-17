import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import NavigationHandler from "../handler/NavigationHandler";
import AuthenticationHandler from "../handler/AuthenticationHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";
import { FaRegUserCircle } from "react-icons/fa";
import { CiChat1, CiChat2, CiHome, CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import logo from "../Assets/Logo/logo.jpg";
import { BiLogOutCircle } from "react-icons/bi";
const Navbar = () => {
  const authData = useRecoilValue(AuthState);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();

  const { query } = useParams();

  useEffect(() => {
    setSearchQuery(query);
  }, []);

  const { navigateToAdminPanel, navigateToSignInPage, navigateToServiceProviderPage, navigateToHomePage, navigateToProfilePage } = NavigationHandler();
  const { logOutHandler } = AuthenticationHandler();

  const handleSearchClick = () => {
    if (!searchQuery?.trim()) return;
    navigate(`/search/${searchQuery}`);
  };

  const chatButtomHandler = () => {
    
  }

  return (
    <nav className="sticky flex items-center top-0 px-5 bg-white z-20 h-[70px]">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left section of the header */}
        <div className="flex items-center">
          <div className="h-[50px]" onClick={navigateToHomePage}>
            <img
              className="h-full w-full object-cover object-center rounded-lg"
              alt="logo"
              src={logo}
            />
          </div>
          <div className="lg:ml-5 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[200px] lg:w-[450px] px-4 py-2 bg-blue-50  rounded-md outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 left-[93%]"
              onClick={handleSearchClick}
            >
              <CiSearch className="text-xl text-blue-400 hover:text-blue-900" />
            </span>
          </div>
        </div>

        {/* Right section of the header */}
        <div className="flex items-center gap-4">
          {authData?._id && (
            <div className="text-gray-900">
              <span
                className="cursor-pointer text-gray-600"
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
            <button className="text-blue-600" onClick={chatButtomHandler}>
              {/* <CiChat1 className="text-lg" /> */}
              Chat
            </button>
          </div>
          <div className="">
            {authData?._id ? (
              <div className="">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <div
                      className="flex items-center gap-2 bg-blue-400 text-gray-800 px-4 py-2
                rounded-md cursor-pointer"
                    >
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
                        className="w-full flex justify-start items-center gap-3 bg-blue-100 p-1"
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
      </div>
    </nav>
  );
};

export default Navbar;
