import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import { BiCategory } from "react-icons/bi";
import CategoryCard from "./CategoryCard";
import CategoryHandler from "../../handler/CategoryHandler";
import { useNavigate } from "react-router-dom";

const Categories = () => {
   const { getCategoriesHandler } = CategoryHandler();
  const [categories, setCategories] = useState([]);
  
  const navigate = useNavigate();

  const onCategoryClick = () => {
    navigate("/categories");
  }

   useEffect(() => {
     getCategoriesHandler()
       .then((res) => {
         console.log(res.data.data);
         setCategories(res.data.data);
       })
       .catch((err) => console.log(err));
   }, []);
  
  return (
    <PageContainer>
      <div className="w-full flex gap-10 items-center justify-center overflow-x-auto py-5 px-10">
        <div className="flex flex-col items-center gap-2" onClick={onCategoryClick}>
          <div className="h-20 w-20 flex justify-center items-center overflow-hidden bg-blue-100 rounded-full">
            <BiCategory className="text-6xl" />
          </div>
          <div className="">
            <button className="font-semibold text-sm">
              Categories
            </button>
          </div>
        </div>
        {categories.length > 0 &&
          categories.map((value, index) => (
            <CategoryCard key={index} data={value} />
          ))}
      </div>
    </PageContainer>
  );
};

export default Categories;
