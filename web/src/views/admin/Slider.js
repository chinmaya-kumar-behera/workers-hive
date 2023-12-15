import React, { useState, useRef, useEffect } from "react";
import SliderHandler from "../../handler/SliderHandler";
import { FaPlus } from "react-icons/fa";
import Dialog from "../../components/ui/Dialog";

const Slider = () => {
  const { addSliderImageHandler, getSliderImageHandler ,deleteSliderImageHandler} = SliderHandler();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);

  const onFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setPreviewModal(true);

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = () => {
    addSliderImageHandler(image)
      .then((res) => {
          setSliderImages(res.data.images);
          setPreviewModal(false);
          setImage(null);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSliderImageHandler()
      .then((res) => {
        setSliderImages(res.data.data[0].images);
      })
      .catch((err) => console.log(err));
  }, []);

    const onDeleteHandler = (value) => {
        deleteSliderImageHandler(value)
          .then((res) => {
            console.log(res);
            setSliderImages(res.data.data.images);
          })
          .catch((err) => console.log(err));
    };

  return (
    <div>
      <div className="">
        <h2 className="font-semibold mb-5 text-2xl">Slider Images section</h2>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-y-10 gap-x-5">
        {sliderImages.map((value, index) => (
          <div
            key={index}
            className="relative h-[150px] w-full max-w-[300px] rounded"
          >
            <img
              alt="slider_image"
              src={value}
              className="h-full w-full object-cover object-center rounded"
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-[90%] h-10 w-10 flex justify-center items-center bg-gray-300 rounded-full">
              <span className="text-lg font-bold text-blue-700">
                {index + 1}
              </span>
            </div>
            <div className="absolute h-10 w-10 top-2 left-[80%]">
              <button className="bg-red-400 px-[15px] py-1 text-white rounded-sm text-sm hover:bg-red-300 transition-all" onClick={()=>onDeleteHandler(value)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="h-[150px] w-full max-w-[300px] flex justify-center items-center overflow-hidden rounded">
          <button
            className="p-5 flex justify-center items-center bg-gray-300 text-white rounded-full hover:bg-gray-300 transition-all"
            onClick={onButtonClick}
          >
            <FaPlus className="text-3xl" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
        </div>

        <Dialog
          isOpen={previewModal}
          onClose={() => {
            setPreviewModal(false);
          }}
          className="h-full lg:h-auto overflow-hidden"
          contentClassName={`w-full bg-white lg:max-w-3xl sm:rounded-lg overflow-hidden`}
          overlayClassName="backdrop-blur"
        >
          <div className="h-full w-full p-2">
            <img
              alt="slider_image_set"
              src={image && URL.createObjectURL(image)}
              className="w-full h-[350px] object-cover rounded-lg"
            />
            <div className="flex justify-center py-2">
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all"
                onClick={onSubmit}
              >
                Upload
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Slider;
