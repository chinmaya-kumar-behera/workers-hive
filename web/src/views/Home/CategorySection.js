import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import CategoryCardDetails from "./components/CategoryCardDetails";
import CategoryHandler from "../../handler/CategoryHandler";
import Skeleton from "../../components/ui/Skeleton";

const CategorySection = ({ id, heading }) => {

   const { getSubcategoriresByCategoryIdHandler } = CategoryHandler();

   const [subcategories, setSubCategories] = useState([]);

   useEffect(() => {
     getSubcategoriresByCategoryIdHandler(id)
       .then((res) => {
        //  console.log(res.data.data);
         setSubCategories(res.data.data);
       })
       .catch((err) => console.log(err));
   }, []);
  
  return (
    <PageContainer className="p-0 sm:p-1 md:p-3 lg:p-5 space-y-0 lg:space-y-5">
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold py-2 text-center lg:text-left">
        {heading}
      </div>
      <div className="w-full">
        <PageContainer className="py-5 rounded flex flex-wrap gap-3">
          {subcategories.length > 0
            ? subcategories.map((value) => (
                <CategoryCardDetails key={value._id} data={value} />
              ))
            : Array.from(
                { length: window.innerWidth >= 1024 ? 6 : 2 },
                (_, index) => index + 1
              ).map((value, index) => (
                <div
                  key={index}
                  className="w-full max-w-full sm:max-w-1/2 md:max-w-[250px] h-[250px]"
                >
                  <Skeleton
                    height="100%"
                    width="100%"
                    className={"rounded-xl"}
                  />
                </div>
              ))}
          {/*  */}
        </PageContainer>
      </div>
    </PageContainer>
  );
};

export default CategorySection;
