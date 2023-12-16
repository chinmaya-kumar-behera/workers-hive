import React from 'react'

const NameFill = ({ handleChange, formData }) => {
  return (
    <div className="w-full flex gap-5">
      <div className="w-full">
        <label className="font-bold mb-1 text-gray-700 block">
          Enter first name
        </label>
        <input
          name="firstName"
          type="text"
          className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Enter first name..."
          onChange={handleChange}
          value={formData.firstName }
        />
      </div>
      <div className="w-full">
        <label className="font-bold mb-1 text-gray-700 block">
          Enter Last name
        </label>
        <input
          name="lastName"
          type="text"
          className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Enter last name..."
          onChange={handleChange}
          value={formData.lastName}
        />
      </div>
    </div>
  );
};

export default NameFill