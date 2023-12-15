import axios from "axios";

export const signUpService = (data) => {
  return axios.post(`http://localhost:5000/api/signup`, data);
};

export const signInService = (data) => {
  return axios.post(`http://localhost:5000/api/signIn`, data);
};
