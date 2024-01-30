import axios from 'axios';

export const creataServiceWorkerService = (data) => {
    const {userId, firstName, lastName, email, gender, mobileNumber, category, subCategory, professionDescription, profilePic, price, city, country, workingPhotos } = data;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("professionDescription", professionDescription);
    formData.append("userId", userId);
    formData.append("price", price);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("country", country);

    formData.append("profilePic", profilePic);
   
    if (workingPhotos.length > 0) {
       workingPhotos.forEach((photo, index) => {
         formData.append("workingPhotos", photo);
       });
    }
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/serviceWorker/create`, formData);
};


export const getWorkersBySubcategoryIdService = (data) => {
    const { id } = data;
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/workers/${id}`);
}