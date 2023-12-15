import axios from "axios";

export const getUserDetailsService = (id) => {
  return axios.get(`http://localhost:5000/api/user/${id}`);
};
