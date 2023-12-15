import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import NavigationHandler from "../handler/NavigationHandler";
import AuthenticationHandler from "../handler/AuthenticationHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../Assets/Logo/logo.jpg";
const Navbar = () => {
  const authData = useRecoilValue(AuthState);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();

  const { query } = useParams();

  useEffect(() => {
    setSearchQuery(query);
  }, []);

  const { navigateToAdminPanel, navigateToSignInPage, navigateToServiceProviderPage, navigateToHomePage } = NavigationHandler();
  const { logOutHandler } = AuthenticationHandler();

  const handleSearchClick = () => {
    if (!searchQuery?.trim()) return;
    navigate(`/search/${searchQuery}`);
  };

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
              <CiSearch className="text-xl text-blue-700 hover:text-blue-900" />
            </span>
          </div>
        </div>

        {/* Right section of the header */}
        <div className="flex items-center gap-4">
          {authData?._id && (
            <div className="text-gray-900">
              <span
                className="cursor-pointer"
                onClick={navigateToServiceProviderPage}
              >
                Become a service provider !
              </span>
            </div>
          )}
          <button className="text-blue-900" onClick={navigateToHomePage}>
            Home
          </button>
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
                  <MenuList className="relative w-[200px] right-10 z-[21] bg-gray-100 py-3">
                    <div className="absolute left-[85%] -top-2 h-4 w-4 -rotate-45 bg-gray-100"></div>

                    {authData.role === "admin" && (
                      <MenuItem
                        className="w-full hover:bg-red-100 p-1"
                        onClick={navigateToAdminPanel}
                      >
                        Admin Panel
                      </MenuItem>
                    )}
                    <MenuItem
                      className="w-full hover:bg-red-100 p-1"
                      onClick={logOutHandler}
                    >
                      Logout
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
