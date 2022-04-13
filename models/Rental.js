const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  startRentDate: {
    type: Date,
    required: [true, "Please add a startRentDate"],

  },
  endRentDate: {
    type: Date,
    required: [true, "Please add an endRentDate"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  carProvider: {
    type: mongoose.Schema.ObjectId,
    ref: "CarProvider",
    require: [true, "Please add a carProvider"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rental", RentalSchema);
