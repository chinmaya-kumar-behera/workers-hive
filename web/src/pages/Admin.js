import React from "react";
import AdminSidePanel from "../views/admin/AdminSidePanel";
import { Route, Routes } from "react-router-dom";
import CategoryTable from "../views/admin/Category/CategoryTable";
import SubCategory from "../views/admin/SubCategory/SubCategory";
import Slider from "../views/admin/Slider";

const Admin = () => {
  return (
    <div className="px-2 mt-2">
      <div className="flex gap-5">
        <AdminSidePanel />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<CategoryTable />} />
            <Route path="/category/:id" element={<SubCategory />} />
            <Route path="/slider" element={<Slider />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
