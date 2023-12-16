import React from 'react'

const PhoneFill = ({ handleChange, formData }) => {
  return (
    <div className="w-full">
      <label className="font-bold mb-1 text-gray-700 block">
        Mobile Number
      </label>
      <input
        name="mobileNumber"
        type="text"
        className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none text-gray-600 font-medium"
        placeholder="Enter Mobile number..."
        value={formData.mobileNumber}
        onChange={handleChange}
      />
    </div>
  );
};

export default PhoneFill