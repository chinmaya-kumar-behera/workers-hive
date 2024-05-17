// import React, { useEffect, useState } from "react";
// import PageContainer from "../../components/shared/PageContainer";
// import CategoryCardDetails from "./components/CategoryCardDetails";
// import CategoryHandler from "../../handler/CategoryHandler";
// import Skeleton from "../../components/ui/Skeleton";

// const CategorySection = ({ id, heading }) => {

//    const { getSubcategoriresByCategoryIdHandler } = CategoryHandler();

//    const [subcategories, setSubCategories] = useState([]);

//    useEffect(() => {
//      getSubcategoriresByCategoryIdHandler(id)
//        .then((res) => {
//         //  console.log(res.data.data);
//          setSubCategories(res.data.data);
//        })
//        .catch((err) => console.log(err));
//    }, []);
  
//   return (
//     <PageContainer className="p-0 sm:p-1 md:p-3 lg:p-5 space-y-0 lg:space-y-5">
//       <div className="text-2xl md:text-3xl lg:text-4xl font-semibold py-2 text-center lg:text-left">
//         {heading}
//       </div>
//       <div className="w-full">
//         <PageContainer className="py-5 rounded flex flex-wrap gap-3">
//           {subcategories.length > 0
//             ? subcategories.map((value) => (
//                 <CategoryCardDetails key={value._id} data={value} />
//               ))
//             : Array.from(
//                 { length: window.innerWidth >= 1024 ? 6 : 2 },
//                 (_, index) => index + 1
//               ).map((value, index) => (
//                 <div
//                   key={index}
//                   className="w-full max-w-full sm:max-w-1/2 md:max-w-[250px] h-[250px]"
//                 >
//                   <Skeleton
//                     height="100%"
//                     width="100%"
//                     className={"rounded-xl"}
//                   />
//                 </div>
//               ))}
//           {/*  */}
//         </PageContainer>
//       </div>
//     </PageContainer>
//   );
// };

// export default CategorySection;


import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import CategoryCardDetails from "./components/CategoryCardDetails";
import CategoryHandler from "../../handler/CategoryHandler";
import Skeleton from "../../components/ui/Skeleton";
import ImageHandler from "../../handler/ImageHandler";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

const ShowCard = ({ data }) => {
  const navigate = useNavigate();
  const { convertImageURL } = ImageHandler();

  const handleClick = () => {
    navigate(`/subcategory/${data._id}`);
  };

  return (
    <div
      className="min-w-[90px] w-[90px] min-h-[90px] space-y-2 bg-gray-50 transition-all duration-300 hover:scale-105 rounded-lg cursor-pointer hover:text-blue-500"
      onClick={handleClick}
    >
      <div className="w-full h-[90px]">
        <img
          alt={"service"}
          src={convertImageURL(data.image)}
          className="h-full w-full object-cover object-center rounded-full"
        />
      </div>
      <div className="">
        <h3 className="text-xs text-center font-semibold max-w-[90px] truncate" title={data.heading}>{data.heading}</h3>
      </div>
    </div>
  );
};

const CategorySection = ({ id, heading, rowreverse=false, image, desc }) => {
  const { getSubcategoriresByCategoryIdHandler } = CategoryHandler();
  const [subcategories, setSubCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSubcategoriresByCategoryIdHandler(id)
      .then((res) => {
        //  console.log(res.data.data);
        setSubCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageContainer className="">
      {subcategories ? (
        <section>
          <div className="py-5">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2 text-center">
              {heading}
            </h3>
          </div>
          <div className="p-2 lg:p-10">
            <div className={`flex flex-col ${rowreverse ? 'lg:flex-row-reverse' :'lg:flex-row'} gap-4`}>
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="text-center">
                  <p>
                    {desc}
                  </p>
                </div>
                <div className="pb-10 space-y-4 text-center">
                  <div className="">
                    <h3 className="text-lg lg:text-xl font-semibold py-2">
                      {heading} services
                    </h3>
                  </div>
                  <div className="w-full h-[135px] flex gap-4 items-center justify-center overflow-x-auto no-scrollbar">
                    {subcategories.map((value) => (
                      <ShowCard key={value._id} data={value} />
                    ))}
                    <div className="h-[90px] w-[90px] flex flex-col justify-center items-center rounded-full">
                      <button
                        className="bg-blue-500 p-3 text-white text-xs rounded-full hover:bg-blue-400 transition-all"
                        title="explore more"
                        onClick={() => navigate(`/category/${id}`)}
                      >
                        <IoIosArrowForward className="text-3xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center items-center">
                <img
                  className="h-[200px] lg:h-[250px] w-auto object-cover rounded-xl"
                  src={image}
                  alt="alt"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Skeleton
          height={window.innerWidth >= 1024 ? "300px" : "200px"}
          width="100%"
          className={"rounded-xl"}
        />
      )}
      {/* <div className="w-full">
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
        </PageContainer>
      </div> */}
    </PageContainer>
  );
};

export default CategorySection;
