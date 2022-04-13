const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  startRentDate: {
    type: Date,
    required: true,
  },
  endRentDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  carProvider: {
    type: mongoose.Schema.ObjectId,
    ref: "Hospital",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rental", RentalSchema);
