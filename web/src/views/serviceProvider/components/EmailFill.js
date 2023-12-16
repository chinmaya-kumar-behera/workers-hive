import React from 'react'

const EmailFill = ({ authData }) => {
  return (
    <div className="">
      <label className="font-bold mb-1 text-gray-700 block">Email</label>
      <input
        name="email"
        type="email"
        className="w-full py-3 px-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        placeholder="Enter your email address..."
        readOnly
        value={authData?.email}
      />
    </div>
  );
};

export default EmailFill