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
          className="font-semibold text-sm cursor-pointer max-w-[100px] truncate overflow-hidden"
        >
          {data.heading}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
