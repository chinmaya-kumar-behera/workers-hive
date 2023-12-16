import React, { useRef } from 'react'
import { FaUserAlt } from 'react-icons/fa';

const ImageFill = ({ setFormData, formData }) => {
  const fileInputRef = useRef(null);

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setFormData({
        ...formData,
        profilePic: selectedImage,
      });
    }
  };

  return (
    <div className="text-center">
      <div className="mx-auto w-32 h-32  rounded-full relative bg-gray-100 mb-4 shadow-inset">
        {formData?.profilePic ? (
          <img
            id="image"
            className="object-cover w-full h-32 rounded-full overflow-hidden"
            src={URL.createObjectURL(formData?.profilePic)}
            alt="profile_pic"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center border rounded-full border-gray-300">
            <FaUserAlt className="text-7xl text-gray-500" />
          </div>
        )}
      </div>
      <div className="space-y-1">
        <button
          type="button"
          className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
          onClick={handleImageButtonClick}
        >
          {/* camera icon */}
          Browse Photo
        </button>
        <div className="">
          <label className="mx-auto w-48 text-gray-500 text-xs text-center mt-2">
            Click to add profile picture
          </label>
        </div>
      </div>{" "}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        name="image"
        onChange={onFileChange}
      />
      <input
        name="photo"
        id="fileInput"
        accept="image/*"
        className="hidden"
        type="file"
      />
    </div>
  );
};

export default ImageFill