const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  getListing,
  getNewForm,
  addNewListing,
  getEditForm,
  updateListing,
  getParticularListing,
  deleteListing,
  getCategoryListing,
} = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js"); // Import the cloudinary storage configuration
const upload = multer({ storage }); // Set up multer with cloudinary storage
const wrapAsync = require("../utils/wrapAsync.js");

// Routes
router
  .route("/")
  .get(getListing) // All listing page
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(addNewListing)
  ); // Add new listing

// Add-new-listing form (should be above the /listings/:id route because it takes new as a id parameter)
router.get("/new", isLoggedIn, getNewForm);

router.get("/:category", getCategoryListing);

router
  .route("/:id")
  .get(getParticularListing) // Particular listing detail
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    updateListing
  ) // Update listing
  .delete(isLoggedIn, isOwner, deleteListing); // Delete listing

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, getEditForm);

module.exports = router;
