const Slider = require("../models/sliderImageModel");

const addSliderImage = async (req, res) => {
  try {
    const { file } = req;
    const imageUrl = `${process.env.BASE_URL}/images/${file.filename}`;

    let sliderData = await Slider.findOne();

    if (sliderData) {
      sliderData.images.push(imageUrl);
    } else {
      sliderData = new Slider({
        images: [imageUrl],
      });
    }

    const result = await sliderData.save();
    // console.log(result);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSliderImage = async (req, res) => {
  try {
    let sliderData = await Slider.find();
    res.status(201).json({ data: sliderData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSliderImage = async (req, res) => {
  try {
    const { imageUrlToDelete } = req.query;

    let sliderData = await Slider.findOne();

    if (sliderData) {
      const indexToDelete = sliderData.images.indexOf(imageUrlToDelete);

      if (indexToDelete !== -1) {
        sliderData.images.splice(indexToDelete, 1);
        await sliderData.save();
      }
    } else {
      sliderData = new Slider({
        images: [],
      });
    }

    res.status(200).json({ data: sliderData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addSliderImage, getSliderImage, deleteSliderImage };
