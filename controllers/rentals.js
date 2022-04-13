const Rental = require("../models/Rental");
const CarProvider = require("../models/CarProvider");

//@desc     Get all Rental
//@route    GET /api/v1/rentals
//@access   Public
exports.getRentals = async (req, res, next) => {
    let query

    //General users can see only their Rentals!
    if (req.user.role !== "admin") {
        query = Rental.find({ user: req.user.id }).populate({
            path: "carProvider",
            select: "name tel",
        });
    } else {
        //If you are an admin, you can see all!
        if (req.params.carProviderId) {
            query = Rental.find({ carProvider: req.params.carProviderId }).populate({
                path: "carProvider",
                select: "name tel",
            });
        } else {
            query = Rental.find().populate({
                path: "carProvider",
                select: "name tel",
            });
        }
    }
    try {
        const rentals = await query;

        res.status(200).json({
            success: true,
            count: rentals.length,
            data: rentals,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot find Rental" });
    }
};

//@desc     Get single Rental
//@route    GET /api/v1/rentals/:id
//@access   Public
exports.getRental = async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id).populate({
            path: "carProvider",
            select: "name tel",
        });

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: `No rental with the id of ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: rental,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot find Rental" });
    }
};

//@desc     Add single Rental
//@route    Create /api/v1/rentals/:id
//@access   Private
exports.addRental = async (req, res, next) => {
    try {
        // validate param
        const { startRentDate, endRentDate, carProviderId } = req.body;
        if ([startRentDate, endRentDate, carProviderId].some((item) => !item)) {
            return res.status(400).json({
                success: false,
                message: `missing params in body`,
            });
        }

        const parsedStartRentDate = Date.parse(startRentDate)
        const parsedEndRentDate = Date.parse(endRentDate)
        if (isNaN(parsedStartRentDate) || isNaN(parsedEndRentDate)) {
            return res.status(400).json({
                success: false,
                message: `startRentDate or endRentDate are invalid`,
            });
        }

        if (parsedStartRentDate >= parsedEndRentDate) {
            return res.status(400).json({
                success: false,
                message: `endRentDate cannot come before or equal to startRentDate`,
            });
        }

        if (parsedStartRentDate < Date.now()) {
            return res.status(400).json({
                success: false,
                message: `startRentDate can not be in the past`,
            });
        }

        const carProvider = await CarProvider.findById(req.body.carProviderId);

        if (!carProvider) {
            return res.status(404).json({
                success: false,
                message: `No carProvider with the id of ${req.body.carProviderId}`,
            });
        }
        req.body.carProvider = carProvider.id;
        // Add user Id to req.body
        req.body.user = req.user.id;

        // Check for existed rental
        const existedRental = await Rental.find({ user: req.user.id });

        // If the user is not an admin, they can only create 3 rental
        if (existedRental.length >= 3 && req.user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 rentals`,
            });
        }

        const rental = await Rental.create(req.body);

        res.status(200).json({
            success: true,
            data: rental,
        });
    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .json({ success: false, message: "Cannot create Rental" });
    }
};
//@desc      Update single Rental
//@route     PUT /api/v1/rentals/:id
//@access    Private
exports.updateRental = async (req, res, next) => {
    try {
        let rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: `No rental with the id of ${req.params.id}`,
            });
        }

        // Make sure user is the rental owner
        if (
            rental.user.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this rental`,
            });
        }

        const startRentDate = req.body.startRentDate || rental.startRentDate
        const endRentDate = req.body.endRentDate || rental.endRentDate

        const parsedStartRentDate = Date.parse(startRentDate)
        const parsedEndRentDate = Date.parse(endRentDate)

        if (isNaN(parsedStartRentDate) || isNaN(parsedEndRentDate)) {
            return res.status(400).json({
                success: false,
                message: `startRentDate or endRentDate are invalid`,
            });
        }

        if (parsedStartRentDate >= parsedEndRentDate) {
            return res.status(400).json({
                success: false,
                message: `endRentDate cannot come before or equal to startRentDate`,
            });
        }

        if (parsedStartRentDate < Date.now()) {
            return res.status(400).json({
                success: false,
                message: `startRentDate can not be in the past`,
            });
        }

        rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: rental,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot update Rental" });
    }
};
//@desc      Delete single Rental
//@route     DELETE /api/v1/rentals/:id
//@access    Private
exports.deleteRental = async (req, res, next) => {
    try {
        let rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: `No rental with the id of ${req.params.id}`,
            });
        }

        // Make sure user is the rental owner
        if (
            rental.user.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this rental`,
            });
        }

        await rental.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Cannot delete Rental" });
    }
};