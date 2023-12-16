import React from "react";

const GenderFill = ({ handleChange, formData }) => {
  return (
    <div className="flex items-center gap-3">
      <label className="font-bold mb-1 text-gray-700 block">Gender</label>
      <div className="flex">
        <label className="flex justify-start items-center text-truncate rounded-lg  pl-4 pr-6 py-3 mr-4">
          <div className="text-teal-600 mr-3">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className="form-radio focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="select-none text-gray-700">Male</div>
        </label>

        <label className="flex justify-start items-center text-truncate rounded-lg pl-4 pr-6 py-3">
          <div className="text-teal-600 mr-3">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className="form-radio focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="select-none text-gray-700">Female</div>
        </label>
      </div>
    </div>
  );
};

export default GenderFill;
