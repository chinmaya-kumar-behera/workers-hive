import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${data._id}`);
  };

  return (
    <div className="flex flex-col items-center gap-2" onClick={handleClick}>
      <div className="h-20 w-20 flex justify-center items-center overflow-hidden">
        <img
          alt={"category"}
          src={data.image}
          className="object-center object-cover rounded-md"
        />
      </div>
      <div className="">
        <span className="font-semibold text-sm cursor-pointer">
          {data.heading}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
