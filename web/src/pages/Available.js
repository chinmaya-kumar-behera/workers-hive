import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import EmployeeCard from "../views/employee/EmployeeCard";
import Navbar from "../views/header/Navbar";
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
  const [noResults, setNoResults] = useState(false);


  useEffect(() => {
    getWorkersBySubcategoryIdHandler({ id })
      .then((res) => {
        setworkers(res.data.data);
        // console.log(res.data.data);
        if (res.data.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);


  useEffect(() => {
    getSubcategoryDetailsByIdHandler(id)
      .then((res) => {
        // console.log(res.data.data);
        setSubcategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  

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
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-5 min-h-[90vh]">
            {/* similar items */}
            <div className="hidden lg:block w-2/6 p-2">
              <div className="p-3 mb-3">
                <h4 className="text-lg font-semibold">Similar items</h4>
                <hr className="mt-2" />
              </div>
              <div className="grid grid-cols-3 gap-2 justify-center">
                {subcategories.length > 0
                  ? subcategories?.map((value, index) => (
                      <SubCategoryCard
                        key={value._id}
                        data={value}
                        subCategoryId={id}
                      />
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

            <div className="w-full lg:w-4/6 p-2 space-y-2">
              <div className="p-3">
                <h4 className="text-lg font-semibold">Available captains</h4>
                <hr className="mt-2" />
              </div>
              <div className="p-2 space-y-2 rounded">
                {workers.length > 0 &&
                  workers.map((value, index) => (
                    <EmployeeCard key={value._id} data={value} />
                  ))}
                {noResults && <div className="text-center">
                  <h3>Oops.. ! No results found</h3>
                </div>}
              </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Available;
