import React from "react";
import PageContainer from "../../components/shared/PageContainer";
import TrendingServiceCard from "./components/TrendingServiceCard";

const TrendingServices = () => {
  return (
    <PageContainer className="p-5">
      <div className="mb-10 space-y-1">
        <h2 className="text-xl lg:text-4xl font-semibold">Trending Services</h2>
        <p className="text-md">Most searched services on our site.</p>
      </div>
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
        <TrendingServiceCard />
      </div>
    </PageContainer>
  );
};

export default TrendingServices;
