import React, { useState } from "react";
import Loader from "../../components/ui/Loader";
import AuthenticationHandler from "../../handler/AuthenticationHandler";

const VerifyOTP = () => {
  const { verifyOTPHandler } = AuthenticationHandler();

  const [signUpData, setSignUpData] = useState({
    otp: "",
  });
    const [loading, setLoading] = useState(false);

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(signUpData);
        verifyOTPHandler({ hello: "hii" });
    }


  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Verify account
        </h1>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter OTP"
              required=""
              onChange={onChangeHandle}
              value={signUpData.otp}
            />
          </div>
          <button
            className="w-full font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-700 transition-all"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <Loader/> : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
