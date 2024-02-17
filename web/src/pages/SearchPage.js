import React, { useEffect, useState } from "react";
import Navbar from "../views/Navbar";
import PageContainer from "../components/shared/PageContainer";
import { useParams } from "react-router-dom";
import SearchHandler from "../handler/searchHandler";
import EmployeeCard from "../views/employee/EmployeeCard";

const SearchPage = () => {
  const { query } = useParams();

  const { getSearchHandler } = SearchHandler();
  console.log(query);

  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    getSearchHandler({ query })
      .then((res) => {
        console.log(res);
        setSearchResult(res.data.data);
        if (res.data.data.length === 0) {
          setNoResult(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSearchResult([]);
        setNoResult(true);
      });
  }, [query]);

  return (
    <div>
      <Navbar />
      <PageContainer className="mt-2 min-h-[calc(100vh-80px)]">
        <div className="space-y-2 max-w-3xl mx-auto pb-5">
          <div className="py-5">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center lg:text-left">
              Getting you result on "{query}"
            </h3>
          </div>
          {searchResult.length > 0 &&
            searchResult.map((value, index) => (
              <EmployeeCard key={value._id} data={value} />
            ))}
          {noResult && (
            <div className="bg-gray-100 p-4 rounded">
              <h4 className="text-2xl font-bold">We are sorry</h4>
              <p className="text-sm">No result Found</p>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default SearchPage;
