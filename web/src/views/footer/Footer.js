import React from "react";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import logo from "../../Assets/Logo/logo.jpg";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import PageContainer from "../../components/shared/PageContainer";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-center text-center text-sm text-gray-200 bg-blue-500 py-3">
      <p>&copy; {currentYear} Workers Hive. All rights reserved.</p>
      <p>Designed and developed with ❤️ Workers Hive.</p>
    </div>
  );
};

const Footer = () => {
  const authData = useRecoilValue(AuthState);
  return (
    <footer>
      <div className="mt-20 bg-white px-5">
        <div className="px-1 lg:px-5 bg-gradient-to-tr from-blue-50 via-blue-100 to-blue-300 relative -top-20 rounded-xl shadow-lg">
          <div className="p-5 space-y-5">
            <div className="h-[80px] my-5">
              <img
                src={logo}
                className="w-auto h-full object-center object-cover rounded-xl shadow-lg shadow-blue-300"
                alt="logo"
              />
            </div>

            <div className="pb-10 space-y-10">
              <div className="w-full lg:w-2/5 space-y-3 mt-10 lg:mt-0">
                <h3 className="text-xl font-semibold">Social Links</h3>
                <div className="flex gap-2 items-center">
                  <div
                    className="p-2 rounded-full bg-blue-500 group hover:bg-blue-600 shadow-lg transition-all"
                    title="twitter"
                  >
                    <CiTwitter className="text-xl text-white group-hover:text-white" />
                  </div>
                  <div
                    className="p-2 rounded-full bg-blue-500 group hover:bg-blue-600 shadow-lg transition-all"
                    title="instagram"
                  >
                    <CiInstagram className="text-xl text-white group-hover:text-white" />
                  </div>
                  <div
                    className="p-2 rounded-full bg-blue-500 group hover:bg-blue-600 shadow-lg transition-all"
                    title="youtube"
                  >
                    <CiYoutube className="text-xl text-white group-hover:text-white" />
                  </div>
                  <div
                    className="p-2 rounded-full bg-blue-500 group hover:bg-blue-600 shadow-lg transition-all"
                    title="facebook"
                  >
                    <CiFacebook className="text-xl text-white group-hover:text-white" />
                  </div>
                  <div
                    className="p-2 rounded-full bg-blue-500 group hover:bg-blue-600 shadow-lg transition-all"
                    title="linkedin"
                  >
                    <CiLinkedin className="text-xl text-white group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageContainer className={"pb-10  relative -top-10 text-gray-500"}>
          <div className="flex lg:gap-10">
            <div className="w-[300px] space-y-3">
              <h3 className="text-xl font-semibold">Company</h3>
              <div className="text-sm space-y-1 text-gray-800">
                <a href="aboutus">
                  <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                    About Us
                  </p>
                </a>
                <a href="privacy&policy">
                  <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                    Privacy Policy
                  </p>
                </a>
                <a href="term&conditions">
                  <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                    Terms & Conditions
                  </p>
                </a>
              </div>
            </div>

            <div className="w-[300px] space-y-3">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <div className="text-sm space-y-1 text-gray-800">
                <a href="contactus">
                  <p className="underline cursor-pointer hover:text-blue-700 transition-all">
                    contact us
                  </p>
                </a>
              </div>
            </div>

            {authData.role == "user" && (
              <div className="w-[300px] space-y-3">
                <h3 className="text-xl font-semibold">For Customer</h3>
                <div className="text-sm space-y-1 text-gray-800">
                  <p className="underline cursor-pointer hover:text-blue-700 transition-all">
                    become a service provider
                  </p>
                </div>
              </div>
            )}
          </div>
        </PageContainer>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
