import axios from "axios";

export const addSliderImageService = (data) => {
  const formData = new FormData();
  formData.append("file", data);
  return axios.post(`http://localhost:5000/api/admin/sliderimage`, formData);
};
 

export const getSliderImageService = () => {
  return axios.get(`http://localhost:5000/api/getsliderimage`);
};

export const deleteSliderImageService = (imageUrlToDelete) => {
  return axios.delete(`http://localhost:5000/api/admin/deleteSliderImage`, {
    params: {
      imageUrlToDelete: imageUrlToDelete,
    },
  });
};