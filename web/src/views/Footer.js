import React from "react";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="px-1 lg:px-5">
      <div className="p-5 space-y-4">
        <div className="py-5">
          <h1 className="font-bold text-5xl">Logo here</h1>
        </div>
        <div className="flex justify-between gap-10 pb-10">
          <div className="w-1/5 space-y-3">
            <h3 className="text-xl font-semibold">Company</h3>
            <div className="text-sm space-y-1 text-gray-800">
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                About Us
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Privacy Policy
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Terms & Conditions
              </p>
            </div>
          </div>
          <div className="w-1/5 space-y-3">
            <h3 className="text-xl font-semibold">For Customer</h3>
            <div className="text-sm space-y-1 text-gray-800">
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                About Us
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Privacy Policy
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Terms & Conditions
              </p>
            </div>
          </div>
          <div className="w-1/5 space-y-3">
            <h3 className="text-xl font-semibold">For Partners</h3>
            <div className="text-sm space-y-1 text-gray-800">
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                About Us
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Privacy Policy
              </p>
              <p className="hover:underline cursor-pointer hover:text-blue-700 transition-all">
                Terms & Conditions
              </p>
            </div>
          </div>
          <div className="w-2/5 space-y-3">
            <h3 className="text-xl font-semibold">Social Links</h3>
            <div className="flex gap-2 items-center">
              <div className="p-1.5 rounded-full border-2 border-gray-400 group hover:bg-blue-800 hover:border-blue-800 transition-all">
                <CiTwitter className="text-2xl text-black group-hover:text-white" />
              </div>
              <div className="p-1.5 rounded-full border-2 border-gray-400 group hover:bg-blue-800 hover:border-blue-800 transition-all">
                <CiInstagram className="text-2xl text-black group-hover:text-white" />
              </div>
              <div className="p-1.5 rounded-full border-2 border-gray-400 group hover:bg-blue-800 hover:border-blue-800 transition-all">
                <CiYoutube className="text-2xl text-black group-hover:text-white" />
              </div>
              <div className="p-1.5 rounded-full border-2 border-gray-400 group hover:bg-blue-800 hover:border-blue-800 transition-all">
                <CiFacebook className="text-2xl text-black group-hover:text-white" />
              </div>
              <div className="p-1.5 rounded-full border-2 border-gray-400 group hover:bg-blue-800 hover:border-blue-800 transition-all">
                <CiLinkedin className="text-2xl text-black group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
