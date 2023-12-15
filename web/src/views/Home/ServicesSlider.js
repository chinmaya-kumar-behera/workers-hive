import React, { useEffect, useState } from "react";
import PageContainer from "../../components/shared/PageContainer";
import AutoSlider from "../../components/shared/AutoSlider";
import SliderHandler from "../../handler/SliderHandler";

const ServicesSlider = () => {
  const { getSliderImageHandler } = SliderHandler();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getSliderImageHandler()
      .then((res) => {
        setImages(res.data.data[0].images);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <PageContainer>
      {images.length > 0 && <AutoSlider data={images} />}
    </PageContainer>
  );
};

export default ServicesSlider;
