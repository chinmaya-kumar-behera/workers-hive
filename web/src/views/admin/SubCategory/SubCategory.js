import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryHandler from "../../../handler/CategoryHandler";
import CreateSubCategory from "./CreateSubCategory";

const SubCategory = () => {
  const { id } = useParams();
  const { getCategoryByIdHandler, getSubcategoriresByCategoryIdHandler } = CategoryHandler();

  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [modal, setModal] = useState(false);

  const getCat = () => {
    getSubcategoriresByCategoryIdHandler(id)
      .then((res) => {
        console.log(res.data.data);
        setSubCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCat();
  }, []);


  useEffect(() => {
    getCategoryByIdHandler(id)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnClick = () => {
    setModal(true);
  };

  return (
    <div>
      <div className="w-full bg-gray-200 p-4 rounded">
        <h1 className="font-bold text-3xl">{category?.heading}</h1>
      </div>
      <div className="flex justify-between items-center p-3 bg-white">
        <div className="">
          <h3 className="text-lg font-bold text-blue-500">
            Sub Category Table
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-all text-white text-sm font-semibold">
            Refresh
          </button>
          <button
            onClick={handleOnClick}
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-all text-white text-sm font-semibold"
          >
            Create SubCategory
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div className="">filters optios will be here</div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Index
                </th>
                <th scope="col" className="px-6 py-3">
                  Category Heading
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>

                <th scope="col" className="px-6 py-3">
                  Registered Users
                </th>
              </tr>
            </thead>
            <tbody>
              {subCategories.length > 0 &&
                subCategories.map((value, index) => (
                  <tr
                    key={value._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index}
                    </th>
                    <td className="px-6 py-4">{value.heading}</td>
                    <td className="px-6 py-4">{value.description}</td>
                    <td className="px-6 py-4">
                      <div className="h-10 w-10 overflow-hidden">
                        <img
                          src={value.image}
                          alt="alt"
                          className="h-full w-full object-center object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-xs p-1.5 bg-gray-500 text-white rounded"
                        // onClick={onEditButtonClick}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-xs p-1.5 bg-blue-500 text-white rounded"
                        // onClick={() => onClickSubCategory(value._id)}
                      >
                        Registered Users
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <CreateSubCategory
          isOpen={modal}
          onClose={() => setModal(false)}
          getCat={getCat}
          categoryId={id}
        />
      )}
    </div>
  );
};

export default SubCategory;
