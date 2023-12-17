import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import EmployeeCard from "../views/employee/EmployeeCard";
import Navbar from "../views/Navbar";
import { useParams } from "react-router-dom";
import serviceWorkerHandler from "../handler/serviceWorkerHandler";
import SubCategoryCard from "../views/Home/components/SubCategoryCard";
import CategoryHandler from "../handler/CategoryHandler";
import Skeleton from "../components/ui/Skeleton";

const Available = () => {
  const { id } = useParams();
  const { getWorkersBySubcategoryIdHandler,  } = serviceWorkerHandler();
  const { getSubcategoryDetailsByIdHandler, getSubcategoriresByCategoryIdHandler } = CategoryHandler();

  const [workers, setworkers] = useState([]);
  const [subcategory, setSubcategory] = useState();

  const [subcategories, setSubCategories] = useState([]);


  useEffect(() => {
    getWorkersBySubcategoryIdHandler({ id })
      .then((res) => {
        setworkers(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    getSubcategoryDetailsByIdHandler(id)
      .then((res) => {
        // console.log(res.data.data);
        setSubcategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [])
  

  useEffect(() => {
    if (subcategory?.categoryId) {
      getSubcategoriresByCategoryIdHandler(subcategory.categoryId)
        .then((res) => {
          // console.log(res);
          setSubCategories(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [subcategory?.categoryId]);

  return (
    <div className="">
      <Navbar />
      <PageContainer className={"mt-2"}>
        <div className="">
          <div className="flex gap-5 min-h-screen">
            <div className="w-2/6 p-2">
              <div className="p-3 mb-3">
                <h4 className="text-lg font-semibold">Similar items</h4>
                <hr className="mt-2" />
              </div>
              <div className="grid grid-cols-4 gap-2 justify-center">
                {subcategories.length > 0
                  ? subcategories?.map((value, index) => (
                      <SubCategoryCard key={value._id} data={value} />
                    ))
                  : Array.from({ length: 5 }, (_, index) => index + 1).map(
                      (value) => (
                        <div
                          key={value}
                          className="flex flex-col items-center gap-2"
                        >
                          <Skeleton
                            height="80px"
                            width="80px"
                            className={"rounded-full"}
                          />
                          <Skeleton
                            height="15px"
                            width="50px"
                            className={"rounded-xl"}
                          />
                        </div>
                      )
                    )}
              </div>
            </div>
            <div className="w-4/6 p-2 space-y-2">
              <div className="p-3">
                <h4 className="text-lg font-semibold">Similar items</h4>
                <hr className="mt-2" />
              </div>
              <div className="p-2 bg-gray-100">
              {workers.length > 0 &&
                workers.map((value, index) => (
                  <EmployeeCard key={value._id} data={value} />
                  ))}
                  </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Available;
