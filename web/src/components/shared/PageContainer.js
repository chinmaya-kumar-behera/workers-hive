import React from "react";

const PageContainer = ({ children, className }) => {
  const style = `lg:mx-3 mx-1 bg-white ${className}`;
  return (

      <div className={style}>{children}</div>
  );
};

export default PageContainer;
