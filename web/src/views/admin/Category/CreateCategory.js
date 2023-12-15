import React, { useState } from "react";
import Dialog from "../../../components/ui/Dialog";
import CategoryHandler from "../../../handler/CategoryHandler";

const CreateCategory = ({ isOpen, onClose, getCat }) => {
  const { createCategoryAdminHandler } = CategoryHandler();

  const [categoryData, setCategoryData] = useState({
    heading: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setCategoryData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategoryAdminHandler(categoryData)
      .then((res) => {
        setCategoryData({
          heading: "",
          description: "",
          image: null,
        });

        onClose();
        getCat();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full lg:h-auto "
      contentClassName={`w-full bg-white lg:max-w-3xl sm:rounded-lg`}
      overlayClassName="backdrop-blur"
    >
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-4">
          <label
            htmlFor="heading"
            className="block text-sm font-semibold text-gray-600"
          >
            Category Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={categoryData.heading}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-600"
          >
            Select Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Create Category
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateCategory;
