import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import Navbar from "../views/Navbar";
import serviceWorkerHandler from "../handler/serviceWorkerHandler";
import { useRecoilValue } from "recoil";
import { AuthState } from "../atom/authState";
import CategoryHandler from "../handler/CategoryHandler";
import toast from "react-hot-toast";
import NavigationHandler from "../handler/NavigationHandler";

const ServiceProvider = () => {
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
  });

  useEffect(() => {
    getCategoriesHandler()
      .then((res) => {
        console.log(res.data.data);
        setCategoriesList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (formData.category) {
      getSubcategoriresByCategoryIdHandler(formData.category)
        .then((res) => {
          console.log(res.data.data);
          setSubCategoriesList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [formData.category]);

  const fileInputRef = useRef(null);

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

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setFormData({
        ...formData,
        profilePic: selectedImage,
      });
    }
  };

  return (
    <div className="">
      <Navbar />
      <PageContainer className="mt-2">
        <div className="">
          <div>
            <div className="max-w-3xl mx-auto px-4">
              <div>
                <div className="py-5">
                  <div>
                    <div className="mb-5 text-center">
                      <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                        <img
                          id="image"
                          className="object-cover w-full h-32 rounded-full"
                          src={
                            formData?.profilePic &&
                            URL.createObjectURL(formData?.profilePic)
                          }
                          alt="profile pic"
                        />
                      </div>

                      <label
                        type="button"
                        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                        onClick={handleImageButtonClick}
                      >
                        <input
                          type="file"
                          className="hidden"
                          ref={fileInputRef}
                          name="image"
                          onChange={onFileChange}
                        />
                        {/* camera icon */}
                        Browse Photo
                      </label>

                      <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-2">
                        Click to add profile picture
                      </div>

                      <input
                        name="photo"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        type="file"
                      />
                    </div>

                    <div className="w-full mb-5">
                      <div className="">
                        <label className="font-bold mb-1 text-gray-700 block">
                          Enter your name
                        </label>
                        <input
                          name="name"
                          type="text"
                          className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium bg-gray-100"
                          placeholder="Enter name..."
                          onChange={handleChange}
                          value={formData.name}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="font-bold mb-1 text-gray-700 block">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                        placeholder="Enter your email address..."
                        readOnly
                        value={authData?.email}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-10 mb-5">
                    {/* <div className=" w-fit">
                      <label className="font-bold mb-1 text-gray-700 block">
                        Gender
                      </label>

                      <div className="flex">
                        <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm mr-4">
                          <div className="text-teal-600 mr-3">
                            <input
                              type="radio"
                              x-model="gender"
                              value="Male"
                              className="form-radio focus:outline-none focus:shadow-outline"
                            />
                          </div>
                          <div className="select-none text-gray-700">Male</div>
                        </label>

                        <label className="flex justify-start items-center text-truncate rounded-lg bg-white pl-4 pr-6 py-3 shadow-sm">
                          <div className="text-teal-600 mr-3">
                            <input
                              type="radio"
                              x-model="gender"
                              value="Female"
                              className="form-radio focus:outline-none focus:shadow-outline"
                            />
                          </div>
                          <div className="select-none text-gray-700">
                            Female
                          </div>
                        </label>
                      </div>
                    </div> */}
                    <div className="w-full">
                      <label className="font-bold mb-1 text-gray-700 block">
                        Mobile Number
                      </label>
                      <input
                        name="mobileNumber"
                        type="text"
                        className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                        placeholder="Enter Mobile number..."
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

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

                  <div className="mb-5">
                    <label className="font-bold mb-1 text-gray-700 block">
                      Select Price
                    </label>
                    <input
                      className="w-full py-3 px-3 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 "
                      onChange={handleChange}
                      name="price"
                      value={formData.price}
                      type='number'
                      placeholder="Enter price"
                    />
                      
                  </div>

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
                  <div className="flex justify-center">
                    <button
                      className="py-2 px-14 bg-blue-500 text-white rounded-lg"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ServiceProvider;
