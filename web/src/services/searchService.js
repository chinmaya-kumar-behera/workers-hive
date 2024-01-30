import axios from "axios";

export const getSearchService = (data) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/search/${data.query}`);
};
