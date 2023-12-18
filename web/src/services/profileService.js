import axios from "axios";

export const getUserDetailsService = (id) => {
  return axios.get(`http://localhost:5000/api/user/${id}`);
};


export const updateProfileDetailService = (data) => {
  console.log(data);
  const { id, firstName, lastName, gender, mobileNumber, category, subCategory, professionDescription, profilePic, price, city, country, workingPhotos } = data;
  
  const formData = new FormData();
  if (firstName) formData.append("firstName", firstName);
  if (lastName) formData.append("lastName", lastName);
  if (mobileNumber) formData.append("mobileNumber", mobileNumber);
  if (category) formData.append("category", category);
  if (subCategory) formData.append("subCategory", subCategory);
  if (professionDescription) formData.append("professionDescription", professionDescription);
  if (price) formData.append("price", price);
  if (gender) formData.append("gender", gender);
  if (city) formData.append("city", city);
  if(country) formData.append("country", country);

  if (profilePic) formData.append("profilePic", profilePic);
   
    if (workingPhotos?.length > 0) {
      workingPhotos.forEach((photo, index) => {
        formData.append("workingPhotos", photo);
      });
    }
  return axios.post(`http://localhost:5000/api/user/${id}/update`, formData);
};
;