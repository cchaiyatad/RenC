const CarProvider = require("../models/CarProvider");

//@desc     Get all CarProvider
//@route    GET /api/v1/carproviders
//@access   Public
exports.getCarProviders = async (req, res, next) => {
    let query = CarProvider.find();

    try {
        const carProviders = await query;
        res.status(200).json({ success: true, count: carProviders.length, data: carProviders });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@desc     Get single CarProvider
//@route    GET /api/v1/carproviders/:id
//@access   Public
exports.getCarProvider = async (req, res, next) => {
    try {
        const carProvider = await CarProvider.findById(req.params.id);

        if (!carProvider) {
            res.status(400).json({ success: false });
            return
        }

        res.status(200).json({ success: true, data: carProvider });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@desc     Add single CarProvider
//@route    Create /api/v1/carproviders/:id
//@access   Private
exports.addCarProvider = async (req, res, next) => {
    const carProvider = await CarProvider.create(req.body);
    res.status(201).json({ success: true, data: carProvider });
};

//@desc      Update single CarProvider
//@route     PUT /api/v1/carproviders/:id
//@access    Private
exports.updateCarProvider = async (req, res, next) => {
    try {
        const carProvider = await CarProvider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!carProvider) {
            res.status(400).json({ success: false });
            return
        }

        res.status(200).json({ success: true, data: carProvider });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

//@desc      Delete single CarProvider
//@route     DELETE /api/v1/carproviders/:id
//@access    Private
exports.deleteCarProvider = async (req, res, next) => {
    try {
        const carProvider = await CarProvider.findById(req.params.id);

        if (!carProvider) {
            return res.status(400).json({ success: false });
        }

        carProvider.remove()

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
