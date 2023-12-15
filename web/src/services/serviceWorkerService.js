import axios from 'axios';

export const creataServiceWorkerService = (data) => {
    const {userId, name, email, gender, mobileNumber, category, subCategory, professionDescription, profilePic, price } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("mobileNumber", mobileNumber);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("professionDescription", professionDescription);
    formData.append("file", profilePic);
    formData.append("userId", userId);
    formData.append("price", price);

    return axios.post(`http://localhost:5000/api/serviceWorker/create`, formData);
};


export const getWorkersBySubcategoryIdService = (data) => {
    const { id } = data;
    return axios.get(`http://localhost:5000/api/workers/${id}`);
}