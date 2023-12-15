import React from "react";
import PageContainer from "../../components/shared/PageContainer";
import CategoryCardDetails from "./components/CategoryCardDetails";

const CategorySection = ({ heading }) => {
  return (
    <PageContainer className="p-5 space-y-5">
      <div className="text-4xl font-semibold">{heading}</div>
      <div className="">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
          <CategoryCardDetails />
        </div>
      </div>
    </PageContainer>
  );
};

export default CategorySection;
