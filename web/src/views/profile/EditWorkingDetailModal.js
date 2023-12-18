import React, { useEffect, useState } from "react";
import Dialog from "../../components/ui/Dialog";
import ProfileHandler from "../../handler/ProfileHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import toast from "react-hot-toast";
import WorkingPhotos from "../serviceProvider/components/WorkingPhotos";
import CategoryHandler from "../../handler/CategoryHandler";

const EditWorkingDetailModal = ({ isOpen, onClose }) => {
  const { updateProfileDetailHandler } = ProfileHandler();
  const { getCategoriesHandler, getSubcategoriresByCategoryIdHandler } = CategoryHandler();
  const [categoriesList, setCategoriesList] = useState([]);
  const [SubCategoriesList, setSubCategoriesList] = useState([]);
  const [formData, setFormData] = useState({ workingPhotos: [] });
  const authData = useRecoilValue(AuthState);

   useEffect(() => {
     getCategoriesHandler()
       .then((res) => {
         // console.log(res.data.data);
         setCategoriesList(res.data.data);
       })
       .catch((err) => console.log(err));
   }, []);

   useEffect(() => {
     if (formData.category) {
       getSubcategoriresByCategoryIdHandler(formData.category)
         .then((res) => {
           // console.log(res.data.data);
           setSubCategoriesList(res.data.data);
         })
         .catch((err) => console.log(err));
     }
   }, [formData.category]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProfileDetailHandler({ id: authData._id, ...formData })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Working Details Updated!");
          onClose();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full lg:h-auto overflow-scroll"
      contentClassName={`w-full bg-white lg:max-w-xl sm:rounded-lg overflow-scroll p-5 lg:p-10`}
      overlayClassName="backdrop-blur"
    >
      <div className="max-h-[80vh] max-w-[600px] w-full space-y-10 mx-auto overflow-scroll">
        <form onSubmit={submitHandler}>
          <div className="">
            <div className="rounded">
              {/* // category  */}
              <div className="mb-5">
                <label className="font-bold mb-1 text-gray-700 block">
                  Select Category
                </label>
                <select
                  className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option className="">Choose category</option>

                  {categoriesList.map((value, index) => (
                    <option key={value._id} value={value._id}>
                      {value.heading}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcetegory */}
              <div className="mb-5">
                <label className="font-bold mb-1 text-gray-700 block">
                  Select SubCategory
                </label>
                <select
                  className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium disabled:cursor-no-drop"
                  disabled={!formData?.category}
                  onChange={handleChange}
                  name="subCategory"
                  value={formData.subCategory}
                >
                  <option>Choose Subcategory</option>
                  {SubCategoriesList.map((value, index) => (
                    <option key={value._id} value={value._id}>
                      {value.heading}
                    </option>
                  ))}
                </select>
              </div>

              {/* // Price */}
              <div className="mb-5">
                <label className="font-bold mb-1 text-gray-700 block">
                  Select Price
                </label>
                <input
                  className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 "
                  onChange={handleChange}
                  name="price"
                  value={formData.price}
                  type="number"
                  placeholder="Enter price"
                />
              </div>

              {/* // description */}
              <div className="mb-5">
                <label className="font-bold mb-1 text-gray-700 block">
                  Describe about your profession
                </label>
                <textarea
                  className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Description.."
                  rows="4"
                  onChange={handleChange}
                  name="professionDescription"
                  value={formData.professionDescription}
                />
              </div>

              {/* // Select Photo */}
              <WorkingPhotos setFormData={setFormData} formData={formData} />
              <div className="flex justify-center">
                <button
                  className="px-10 py-2 text-white bg-blue-500 rounded"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditWorkingDetailModal;
