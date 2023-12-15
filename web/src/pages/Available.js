import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import EmployeeCard from "../views/employee/EmployeeCard";
import Navbar from "../views/Navbar";
import { useParams } from "react-router-dom";
import serviceWorkerHandler from "../handler/serviceWorkerHandler";

const Available = () => {
  const { id } = useParams();
  const { getWorkersBySubcategoryIdHandler } = serviceWorkerHandler();

  const [workers, setworkers] = useState([]);

  useEffect(() => {
    getWorkersBySubcategoryIdHandler({ id })
      .then((res) => {
        console.log(res);
        setworkers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <Navbar />
      <PageContainer className={"mt-2"}>
        <div className="text-center py-5">
          <h2 className="text-3xl font-bold">Available service workers</h2>
        </div>
        <div className="">
          <div className="flex gap-5">
            <div className="w-2/6 p-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {/* <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard /> */}
              </div>
            </div>
            <div className="w-4/6 p-2 space-y-2">
              {workers.length > 0 &&
                workers.map((value, index) => (
                  <EmployeeCard key={value._id} data={value} />
                ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Available;
