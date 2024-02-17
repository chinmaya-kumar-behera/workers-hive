import React, { useEffect, useState } from "react";
import serviceWorkerHandler from "../../handler/serviceWorkerHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../../atom/authState";
import CategoryHandler from "../../handler/CategoryHandler";
import toast from "react-hot-toast";
import NavigationHandler from "../../handler/NavigationHandler";
import AddressFill from "./components/AddressFill";
import GenderFill from "./components/GenderFill";
import NameFill from "./components/NameFill";
import EmailFill from "./components/EmailFill";
import PhoneFill from "./components/PhoneFill";
import ImageFill from "./components/ImageFill";
import WorkingPhotos from "./components/WorkingPhotos";

const ServiceDetailsForm = () => {
  const { createServiceWorkerHandler } = serviceWorkerHandler();
  const { getCategoriesHandler, getSubcategoriresByCategoryIdHandler } = CategoryHandler();
  const { navigateToHomePage } = NavigationHandler();
  const [categoriesList, setCategoriesList] = useState([]);
  const [SubCategoriesList, setSubCategoriesList] = useState([]);

  const authData = useRecoilValue(AuthState);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    category: "",
    subCategory: "",
    professionDescription: "",
    price: "",
    workingPhotos: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createServiceWorkerHandler({
      ...formData,
      userId: authData?._id,
      email: authData?.email,
    })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          toast.success("Registration Successfull !");
          setFormData({
            name: "",
            mobileNumber: "",
            category: "",
            subCategory: "",
            professionDescription: "",
          });
          navigateToHomePage();
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <form action="/stats" enctype="multipart/form-data">
      <div className="max-w-6xl flex flex-col lg:flex-row gap-10 mx-auto p-2 md-5">
        <div className="w-full space-y-5 rounded bg-gray-100 px-5 py-10">
          <ImageFill setFormData={setFormData} formData={formData} />

          <div className="space-y-2">
            <NameFill handleChange={handleChange} formData={formData} />
            <EmailFill authData={authData} />
          </div>

          <GenderFill handleChange={handleChange} formData={formData} />
          <PhoneFill formData={formData} handleChange={handleChange} />
          <AddressFill handleChange={handleChange} formData={formData} />
        </div>

        <div className="max-w-[600px] w-full space-y-10">
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
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center pb-10">
        <button
          className="py-2 px-14 bg-blue-500 text-white rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServiceDetailsForm;
