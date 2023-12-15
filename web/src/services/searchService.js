import axios from "axios";

export const getSearchService = (data) => {
  return axios.get(`http://localhost:5000/api/search/${data.query}`);
};
