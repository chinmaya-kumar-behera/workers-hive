import axios from "axios";

export const signUpService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, data);
};

export const signInService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signIn`, data);
};

export const verifyOTPService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/verifyotp`, data);
};

export const resendOTPService = (data) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/resendotp`,data);
};
