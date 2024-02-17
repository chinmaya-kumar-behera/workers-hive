import React from "react";
import { useNavigate } from "react-router-dom";
import ImageHandler from "../../handler/ImageHandler";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();
  const { convertImageURL } = ImageHandler();

  const handleClick = () => {
    navigate(`/category/${data._id}`);
  };

  return (
    <div className="flex flex-col items-center gap-2" onClick={handleClick}>
      <div className="h-14 lg:h-20 w-14 lg:w-20 flex justify-center items-center overflow-hidden rounded-full">
        <img
          alt={"category"}
          src={convertImageURL(data.image)}
          className="h-full w-full object-center object-cover rounded-md"
        />
      </div>
      <div className="max-w-[50px] sm:max-w-[60px] lg:max-w-[100px] overflow-hidden">
        <span
          title={data.heading}
          className="w-full font-semibold text-xs lg:text-sm cursor-pointer truncate overflow-hidden"
        >
          {data.heading}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
