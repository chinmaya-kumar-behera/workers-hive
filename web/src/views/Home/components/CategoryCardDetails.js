import React from "react";
import { useNavigate } from "react-router-dom";
import ImageHandler from "../../../handler/ImageHandler";

const CategoryCardDetails = ({ data }) => {
  const navigate = useNavigate();
  const { convertImageURL } = ImageHandler();

  const handleClick = () => {
    navigate(`/subcategory/${data._id}`);
  };

  return (
    <div
      className="w-full max-w-full sm:max-w-1/2 md:max-w-[250px] space-y-2 bg-gray-50 hover:bg-blue-100 transition-all duration-300 hover:scale-105 p-3 rounded-lg"
      onClick={handleClick}
    >
      <div className="w-full h-[250px] overflow-hidden">
        <img
          alt={"service"}
          src={convertImageURL(data.image)}
          className="h-full w-full object-cover object-center rounded-md"
        />
      </div>
      <div className="">
        <h3 className="font-semibold">{data.heading}</h3>
      </div>
    </div>
  );
};

export default CategoryCardDetails;
