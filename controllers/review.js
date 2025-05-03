const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.addReview = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const newReview = new Review(req.body.review); //req.body = { review:{comment: comment, rating: rating, ...}}
  listing.review.push(newReview);
  newReview.author = req.user._id; // add owner to the review
  await newReview.save();
  await listing.save();
  newReview.populate("author").then((review) => {
    console.log("New Review:", review);
  });
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  let deletedReview = await Review.findByIdAndDelete(reviewId);
  deletedReview.populate("author").then((review) => {
    console.log("Deleted Review:", review);
  });
  res.redirect(`/listings/${id}`);
};
