import React, { useState } from "react";
import Loader from "../../components/ui/Loader";
import AuthenticationHandler from "../../handler/AuthenticationHandler";
import toast from "react-hot-toast";

const VerifyOTP = ({ userData, setVerifyOtp }) => {
  const { verifyOTPHandler, resendOTPHandler } = AuthenticationHandler();

  const [OTP, setOTP] = useState();
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

  const { _id } = userData;

  const onChangeHandle = (event) => {
   setOTP(event.target.value);
  };

  const onSubmit = (event) => {
      event.preventDefault();
      console.log(OTP)
      setLoading(true);
      verifyOTPHandler({ id: _id, otp: OTP })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setVerifyOtp(false);
          }
          if (res.status === 203) {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    
    const onResendOTP = (event) => {
        event.preventDefault();
        setResendLoading(true);
        resendOTPHandler({ id: _id })
            .then((res) => {
                console.log(res); 
                toast.succes('OTP sent to your registered mail!')
            })
          .catch((err) => console.log(err))
          .finally(() => setResendLoading(false));
    }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Verify account
        </h1>
        <label
          htmlFor="otp"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Hii <span className="text-lg font-semibold">{userData.name}</span>
          <br /> An OTP is sent to your registered mail id{" "}
          <span className="text-blue-400">{userData.email}</span>. Enter the OTP
          below to procced with verification!
        </label>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter the 6-digit verification code
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter OTP"
              required=""
              onChange={onChangeHandle}
              value={OTP}
            />
          </div>

          <div className="space-y-3">
            <button
              className="w-full font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? <Loader size={3} /> : "Verify OTP"}
            </button>
            <div className="flex items-center justify-end gap-2 text-gray-400">
              <span>Didnot receive any code</span>
              <button
                className="text-blue-500"
                onClick={onResendOTP}
                disabled={resendLoading}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </form>
        </div>
    </div>
  );
};

export default VerifyOTP;
