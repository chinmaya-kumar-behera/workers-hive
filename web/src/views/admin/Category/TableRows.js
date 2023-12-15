import React from "react";
import { useNavigate } from "react-router-dom";

const TableRows = ({ data }) => {
  const navigate = useNavigate();

  const onClickSubCategory = (id) => {
    navigate(`/admin/category/${id}`);
  }

  const onEditButtonClick = () => {
  }

  return (
    data?.length > 0 &&
    data.map((value, index) => (
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
          <button className="text-xs p-1.5 bg-gray-500 text-white rounded" onClick={onEditButtonClick}>
            Edit
          </button>
        </td>
        <td className="px-6 py-4">
          <button className="text-xs p-1.5 bg-blue-500 text-white rounded" onClick={()=>onClickSubCategory(value._id)}>
            Sub Cat
          </button>
        </td>
      </tr>
    ))
  );
};

export default TableRows;
