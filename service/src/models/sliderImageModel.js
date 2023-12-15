const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  images: [{ type: String }],
});

const sliders = mongoose.model("sliders", sliderSchema);

module.exports = sliders;
