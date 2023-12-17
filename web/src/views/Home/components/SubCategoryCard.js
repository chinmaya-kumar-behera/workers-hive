import React from "react";

const SubCategoryCard = ({ data }) => {
  const handleClick = () => {};
  return (
    <div className="flex flex-col items-center gap-2" onClick={handleClick}>
      <div className="h-20 w-20 flex justify-center items-center overflow-hidden rounded-full">
        <img
          alt={"category"}
          src={data.image}
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

export default SubCategoryCard;
