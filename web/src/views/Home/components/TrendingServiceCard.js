import React from "react";
import mrunal from "../../../mrunal-thakur.jpg";

const TrendingServiceCard = () => {
  return (
    <div className="min-w-[250px] space-y-2 bg-gray-100 p-3 rounded-lg">
      <div className="w-full h-[250px] overflow-hidden">
        <img
          alt={"service"}
          src={mrunal}
          className="h-full w-full object-cover object-center rounded-md"
        />
      </div>
      <div className="">
        <h3 className="font-semibold">Title of work</h3>
      </div>
    </div>
  );
};

export default TrendingServiceCard;
