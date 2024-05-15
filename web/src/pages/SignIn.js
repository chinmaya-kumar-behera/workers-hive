import React, { useState } from "react";
import AuthenticationHandler from "../handler/AuthenticationHandler";
import logo from "../Assets/Logo/logo.jpg";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const { signInHandler, googleLoginHandler } = AuthenticationHandler();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const { email, password } = formData;

    signInHandler({ email, password })
      .then((res) => {
        // const data = res.data.data;
        // localStorage.setItem("userData", JSON.stringify(data));
        // setAuthData({ ...data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLoginSuccess = (token) => {
    const { credential } = token;
    googleLoginHandler(credential);
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <div className="h-[50px] overflow-hidden rounded-xl">
            <img
              src={logo}
              className="w-auto h-full object-center object-cover"
              alt="logo"
            />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="/forgotpassword"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-700 transition-all"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
              <div className="flex justify-center">
                <GoogleLogin
                  theme="filled_black"
                  text="continue_with"
                  shape="pill"
                  cancel_on_tap_outside
                  className="flex items-center justify-center"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  auto_select
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
