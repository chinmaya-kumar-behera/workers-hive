import axios from "axios";

export const addSliderImageService = (data) => {
  const formData = new FormData();
  formData.append("file", data);
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/sliderimage`, formData);
};
 

export const getSliderImageService = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getsliderimage`);
};

export const deleteSliderImageService = (imageUrlToDelete) => {
  return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/deleteSliderImage`, {
    params: {
      imageUrlToDelete: imageUrlToDelete,
    },
  });
};