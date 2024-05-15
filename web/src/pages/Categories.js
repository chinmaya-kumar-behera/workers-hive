import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import CategoryCardDetails from "../views/Home/components/CategoryCardDetails";
import CategoryHandler from "../handler/CategoryHandler";
import Footer from "../views/footer/Footer";
import Navbar from "../views/navbar/Navbar";

const Categories = () => {
  const { getCategoriesHandler } = CategoryHandler();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesHandler()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <Navbar />
      <PageContainer className={"p-5 mt-2"}>
        <div className="mb-5">
          <h2 className="text-4xl font-semibold">Category Heading</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {categories.length > 0 &&
            categories.map((value) => (
              <CategoryCardDetails key={value._id} data={value} />
            ))}
        </div>
      </PageContainer>
      <Footer/>
    </div>
  );
};

export default Categories;
