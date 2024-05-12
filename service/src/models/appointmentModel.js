const mongoose = require('mongoose');

const appointmentModel = mongoose.Schema({
  appointmentId: { type: String },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  description: { type: String },
  appointmentPhotos: [{ type: String }],
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "processing", "paid"],
    default: "pending",
  },
});

module.exports = mongoose.model("Appointments", appointmentModel);