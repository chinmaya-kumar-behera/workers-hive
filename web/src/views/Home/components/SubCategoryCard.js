import React from "react";
import { useNavigate } from "react-router-dom";
import ImageHandler from "../../../handler/ImageHandler";

const SubCategoryCard = ({ data, subCategoryId }) => {
  const bgColor = subCategoryId === data._id ? 'bg-gray-100 shadow-md shadow-blue-200 text-blue-500' : 'bg-gray-50';

  const navigate = useNavigate();
  const { convertImageURL } = ImageHandler();
  const handleClick = (id) => {
    navigate(`/subcategory/${id}`);
  };
  
  return (
    <div
      className={`flex flex-col items-center ${bgColor} py-2 px-2 rounded-xl`}
      onClick={() => handleClick(data._id)}
    >
      <div className="h-20 w-20 flex justify-center items-center overflow-hidden rounded-full">
        <img
          alt={"category"}
          src={convertImageURL(data.image)}
          className="h-full w-full object-center object-cover rounded-md"
        />
      </div>
      <div className="max-w-[100px] overflow-hidden">
        <span
          title={data.heading}
          className="font-semibold text-[13px] cursor-pointer max-w-[100px] truncate overflow-hidden"
        >
          {data.heading}
        </span>
      </div>
    </div>
  );
};

export default SubCategoryCard;
