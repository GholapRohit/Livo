const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");
const { addReview, deleteReview } = require("../controllers/review.js");

// Add Reviews
router.post("/", isLoggedIn, validateReview, addReview);
// Delete Reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, deleteReview);

module.exports = router;
