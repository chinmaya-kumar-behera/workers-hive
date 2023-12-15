import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import CategoryCardDetails from "./components/CategoryCardDetails";
import CategoryHandler from "../../handler/CategoryHandler";

const CategorySection = ({ id, heading }) => {

   const { getSubcategoriresByCategoryIdHandler } = CategoryHandler();

   const [subcategories, setSubCategories] = useState([]);

   useEffect(() => {
     getSubcategoriresByCategoryIdHandler(id)
       .then((res) => {
         console.log(res.data.data);
         setSubCategories(res.data.data);
       })
       .catch((err) => console.log(err));
   }, []);

  return (
    <PageContainer className="p-5 space-y-5">
      <div className="text-4xl font-semibold">{heading}</div>
      <div className="">
        <PageContainer className="mt-2 py-5 rounded flex flex-wrap gap-3">
          {subcategories.length > 0 &&
            subcategories.map((value) => (
              <CategoryCardDetails key={value._id} data={value} />
            ))}
        </PageContainer>
      </div>
    </PageContainer>
  );
};

export default CategorySection;
