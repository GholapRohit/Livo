const mongoose = require("mongoose");
const Review = require("./review"); // import the Review model

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // reference to the Review Model
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: String,
});

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.review,
      },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema); // create a model called Listing based on the listingSchema
module.exports = Listing;
