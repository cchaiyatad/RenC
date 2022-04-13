const res = require("express/lib/response");
const Rental = require("../models/Rental");
const CarProvider = require("../models/CarProvider");

//@desc     Get all Rental
//@route    GET /api/v1/rentals
//@access   Public
exports.getRentals = async (req, res, next) => {};

//@desc     Get single Rental
//@route    GET /api/v1/rentals/:id
//@access   Public
exports.getRental = async (req, res, next) => {};

//@desc     Add single Rental
//@route    Create /api/v1/rentals/:id
//@access   Private
exports.addRental = async (req, res, next) => {};
//@desc      Update single Rental
//@route     PUT /api/v1/rentals/:id
//@access    Private
exports.updateRental = async (req, res, next) => {};
//@desc      Delete single Rental
//@route     DELETE /api/v1/rentals/:id
//@access    Private
exports.deleteRental = async (req, res, next) => {};
