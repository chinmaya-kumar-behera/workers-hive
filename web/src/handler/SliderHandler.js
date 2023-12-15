import { addSliderImageService, deleteSliderImageService, getSliderImageService } from "../services/sliderService";

const SliderHandler = () => {
    const addSliderImageHandler = async (data) => {
       return await addSliderImageService(data);
    };
    const getSliderImageHandler = async () => {
         return await getSliderImageService();
    }
    const deleteSliderImageHandler = async (value) => {
         return await deleteSliderImageService(value);
    }
  return {
    addSliderImageHandler,
    getSliderImageHandler,
    deleteSliderImageHandler,
  };
};

export default SliderHandler;
