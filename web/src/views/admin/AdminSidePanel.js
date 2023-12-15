import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSidePanel = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isCategoryPage = pathname === "/admin";
  const isSliderPage = pathname === "/admin/slider";

  const navigateToSliderPage = () => {
    navigate('/admin/slider')
  }

  const navigateToAdminHomepage = () => {
    navigate('/admin')
  }

  return (
    <div className="w-[200px]">
      <div
        className={`p-3 rounded bg-white`}
        style={{ position: "sticky", top: "80px" }}
      >
        <div className="p-1" onClick={navigateToAdminHomepage}>
          <span
            className={`cursor-pointer font-semibold text-gray-700  ${
              isCategoryPage && "text-orange-500"
            } `}
          >
            Category
          </span>
        </div>
        {/* <div className="p-1">
          <span
            className={`cursor-pointer font-semibold text-gray-700  ${
              isSubCategoryPage && "text-orange-500"
            } `}
          >
            Sub Category
          </span>
        </div> */}
        <div className="p-1" onClick={navigateToSliderPage}>
          <span
            className={`cursor-pointer font-semibold text-gray-700  ${
              isSliderPage && "text-orange-500"
            } `}
          >
            Slider
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidePanel;
