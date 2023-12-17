import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/shared/PageContainer";
import CategoryHandler from "../handler/CategoryHandler";
import CategoryCardDetails from "../views/Home/components/CategoryCardDetails";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import video from "../Assets/Animation/video.mp4";

const SubCategories = () => {
  const { id } = useParams();
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
    <div className="">
      <Navbar />
      <PageContainer className="mt-2">
        <div className="">
          <video
            className="h-[500px] w-screen rounded-lg"
            controls
            autoPlay
            muted
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="mt-10 p-5 rounded flex flex-wrap gap-3">
          {subcategories.length > 0 &&
            subcategories.map((value) => (
              <CategoryCardDetails key={value._id} data={value} />
            ))}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default SubCategories;
