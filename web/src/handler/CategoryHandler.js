import {
  createCategoryAdminService,
  createSubCategoryAdminService,
  getCategoriesService,
  getCategoryByIdService,
  getSubcategoriresByCategoryIdService,
  getSubcategoryDetailsByIdService,
} from "../services/categoryService";

//----------------------  Admin Handlers ------------------//

const CategoryHandler = () => {
  const createCategoryAdminHandler = async (data) => {
   return await createCategoryAdminService(data)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  const createSubCategoryAdminHandler = async (data) => {
   return await createSubCategoryAdminService(data)
      .then((res) => res)
      .catch((err) => console.log(err));
  };


  //-------------- Handlers --------------------------//

  const getCategoriesHandler = async () => {
    return await getCategoriesService()
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => console.log(err));
  };

  const getCategoryByIdHandler = async (id) => {
    return await getCategoryByIdService(id);
  };

   const getSubcategoriresByCategoryIdHandler = async (id) => {
     return await getSubcategoriresByCategoryIdService(id);
  };
  
  const getSubcategoryDetailsByIdHandler = async (id) => {
    return await getSubcategoryDetailsByIdService(id);
  }

  return {
    createCategoryAdminHandler,
    getCategoriesHandler,
    getCategoryByIdHandler,
    createSubCategoryAdminHandler,
    getSubcategoriresByCategoryIdHandler,
    getSubcategoryDetailsByIdHandler,
  };
};

export default CategoryHandler;
