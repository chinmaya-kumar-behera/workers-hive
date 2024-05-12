const mongoose = require('mongoose');

const appointmentModel = mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  description: { type: String },
  appointmentPhotos: [{ type: String }],
});

module.exports = mongoose.model("Appointments", appointmentModel);