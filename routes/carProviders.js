const express = require("express");
const {
    getCarProviders,
    getCarProvider,
    addCarProvider,
    updateCarProvider,
    deleteCarProvider
} = require("../controllers/carProviders");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
    .route("/")
    .get(protect, getCarProviders)
    .post(protect, authorize("admin"), addCarProvider);

router
    .route("/:id")
    .get(protect, getCarProvider)
    .put(protect, authorize("admin"), updateCarProvider)
    .delete(protect, authorize("admin"), deleteCarProvider);

module.exports = router;