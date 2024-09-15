"ues client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../../components/ui/Loader";
// import AuthenticationHandler from "../../handler/AuthenticationHandler";
import toast from "react-hot-toast";
import NavigationHandler from "../../handler/NavigationHandler";
import AuthenticationHandler from "../../handler/AuthenticationHandler";

const VerifyOTP = ({ userData, setVerifyOtp }) => {
  const { verifyOTPHandler, resendOTPHandler } = AuthenticationHandler();
  const { navigateToSignInPage } = NavigationHandler();

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { _id } = userData;

  const intervalId = useRef();
  const [enableOTPsend, setEnableOTPsend] = useState(false);
  const [timer, setTimer] = useState(30);

  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const timerFunction = () => {
    intervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(intervalId.current);
          setEnableOTPsend(true);
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    timerFunction();

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const otp = otpArr.join("");
    verifyOTPHandler({ id: _id, otp })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setVerifyOtp(false);
          navigateToSignInPage();
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
        toast.success("OTP sent to your registered mail!");
        setEnableOTPsend(false);
        setTimer(30);
        timerFunction();
      })
      .catch((err) => console.log(err))
      .finally(() => setResendLoading(false));
  };

  const onChangeHandler = (event, index) => {
    const { value } = event.target;
    const newOtp = otpArr;
    newOtp[index] = value;

    if (index < otpArr.length - 1 && value) {
      inputRefs.current[index + 1].focus();
    }

    setOtpArr(newOtp);
  };

  const keyUpHandler = (event, index) => {
    const { key } = event;
    if (key === "Backspace" && index > 0 && !otpArr[index]) {
      const newOtp = [...otpArr];
      newOtp[index] = "";
      inputRefs.current[index - 1].focus();
      setOtpArr(newOtp);
    }
  };

  const refHandler = (ref, index) => {
    inputRefs.current[index] = ref;
  };

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
          </div>
          <div className="flex gap-1">
            {otpArr.map((digit, index) => (
              <input
                className="w-10 h-10 text-xl pl-[14px] bg- font-bold rounded-md border dark:border text-black dark:text-white bg-gray-100 bg-opacity-50"
                type="text"
                key={index}
                value={digit}
                maxLength={1}
                onChange={(event) => onChangeHandler(event, index)}
                onKeyUp={(event) => keyUpHandler(event, index)}
                autoFocus={index === 0}
                ref={(ref) => refHandler(ref, index)}
              />
            ))}
          </div>

          <div className="space-y-3">
            <button
              className="flex justify-center w-full font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? <Loader size={5} /> : "Verify OTP"}
            </button>
            <div className="flex items-center justify-end gap-2 text-gray-400">
              <span>Didn't receive any code</span>

              {enableOTPsend ? (
                <button
                  className="text-blue-500"
                  onClick={onResendOTP}
                  disabled={resendLoading}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-blue-500">resend in {timer}s</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
