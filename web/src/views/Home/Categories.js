import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import { BiCategory } from "react-icons/bi";
import CategoryCard from "./CategoryCard";
import CategoryHandler from "../../handler/CategoryHandler";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton";

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
        <div
          className="flex flex-col items-center gap-2"
          onClick={onCategoryClick}
        >
          <div className="h-20 w-20 flex justify-center items-center overflow-hidden bg-blue-100 rounded-full">
            <BiCategory className="text-6xl" />
          </div>
          <div className="">
            <button className="font-semibold text-sm">Categories</button>
          </div>
        </div>
        {categories.length > 0
          ? categories
              .slice(0, 7)
              .map((value, index) => <CategoryCard key={index} data={value} />)
          : Array.from({ length: 7 }, (_, index) => index + 1).map((value) => (
              <div className="flex flex-col items-center gap-2">
                <Skeleton
                  height="80px"
                  width="80px"
                  className={"rounded-full"}
                />
                <Skeleton height="15px" width="50px" className={"rounded-xl"} />
              </div>
            ))}
      </div>
    </PageContainer>
  );
};

export default Categories;
