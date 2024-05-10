import React from 'react'
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useRecoilValue } from 'recoil';
import { AuthState } from '../../atom/authState';
import AuthenticationHandler from '../../handler/AuthenticationHandler';
import NavigationHandler from '../../handler/NavigationHandler';

const MenuItems = () => {
    const authData = useRecoilValue(AuthState);
      const {
        navigateToAdminPanel,
        navigateToSignInPage,
        navigateToProfilePage,
        navigateToAppointmentsPage
      } = NavigationHandler();
      const { logOutHandler } = AuthenticationHandler();


  return (
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
                  <MdOutlineAdminPanelSettings className="text-xl" />
                  Admin Panel
                </MenuItem>
              )}
              <MenuItem
                className="w-full flex justify-start items-center gap-3 bg-blue-100 p-2"
                onClick={navigateToAppointmentsPage}
              >
                <MdOutlineAdminPanelSettings className="text-xl" />
                Appointments
              </MenuItem>
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
  );
}

export default MenuItems