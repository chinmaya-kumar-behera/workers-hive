import React from "react";

const AddressFill = ({ handleChange , formData}) => {
  return (
    <div className="w-full flex gap-5 items-center">
      <div className="w-full">
        <label className="font-bold mb-1 text-gray-700 block">
          Enter City name
        </label>
        <input
          name="city"
          type="text"
          className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Enter city name..."
          onChange={handleChange}
          value={formData.city}
        />
      </div>
      <div className="w-full">
        <label className="font-bold mb-1 text-gray-700 block">
          Enter Country name
        </label>
        <input
          name="country"
          type="text"
          className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Enter Country name..."
          onChange={handleChange}
          value={formData.country}
        />
      </div>
    </div>
  );
};

export default AddressFill;
