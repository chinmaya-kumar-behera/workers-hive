import React from "react";

const TableContainer = ({ children, className }) => {
  const style = `min-h-screen w-full ${className}`;
  return <div className={style}>{children}</div>;
};

export default TableContainer;
