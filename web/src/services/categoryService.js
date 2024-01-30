import axios from "axios";

// ----------------------- ADMIN SERVICES ---------------------//

export const createCategoryAdminService = (data) => {
  const formData = new FormData();

  formData.append("heading", data.heading);
  formData.append("description", data.description);
  formData.append("file", data.image);
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/category/create`, formData);
};

export const createSubCategoryAdminService = (data) => {
  const formData = new FormData();
  formData.append("heading", data.heading);
  formData.append("description", data.description);
  formData.append("file", data.image);
  formData.append("categoryId", data.categoryId);
  return axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/admin/subcategory/create`,
    formData
  );
};
;

//  ----------------------- SERVICES -------------------//

export const getCategoriesService = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`);
}
 
export const getCategoryByIdService = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/category/${id}`);
};

export const getSubcategoriresByCategoryIdService = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/subcategories/${id}`);
};

export const getSubcategoryDetailsByIdService = (id) => {
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/subcategorydetail/${id}`);
};
