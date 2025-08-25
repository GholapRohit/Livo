const Listing = require("../models/listing");

module.exports.getListing = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("pages/home", { allListings });
  } catch (err) {
    req.flash("error", "Error fetching listings!");
    next(err);
  }
};

module.exports.getCategoryListing = async (req, res) => {
  try {
    const cat = req.params.category;
    const categoryListings = await Listing.find({ category: cat });
    res.render("pages/category", { categoryListings });
  } catch (err) {
    req.flash("error", "Error fetching listings!");
    next(err);
  }
};

module.exports.getNewForm = (req, res) => {
  res.render("pages/new");
};

module.exports.addNewListing = async (req, res, next) => {
  if (!req.file) {
    return next(new ExpressError("Image upload failed", 400));
  }
  let { path, filename } = req.file;
  let data = req.body.listing; //req.body = { listing:{title: title, }}
  if (!req.body.listing) {
    return next(new ExpressError("Invalid Listing Data", 400));
  }
  if (data.price < 0) {
    return next(new ExpressError("Price must be positive", 400));
  }
  data.image = { url: path, filename: filename };

  const newListing = new Listing(data);
  newListing.owner = req.user._id; // add owner to the listing
  let newlist = await newListing.save();
  console.log(newlist);
  req.flash("success", "Successfully created a new listing!");
  req.flash("error", "Error creating a new listing!");
  res.redirect("/listings");
};

module.exports.getEditForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id); //{title: title, description: description, ...}
  let originalImageUrl = data.image.url;
  originalImageUrl = originalImageUrl.replace("/upload/", "/upload/w_250/");
  if (!data) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("pages/edit", { data, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let data = req.body.listing; //req.body = { listing:{title: title, }}
  if (req.file) {
    let { path, filename } = req.file;
    data.image = { url: path, filename: filename };
  }
  let listing = await Listing.findByIdAndUpdate(id, data);
  await listing.save();
  req.flash("success", "Successfully updated the listing!");
  req.flash("error", "Error updating the listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.getParticularListing = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner"); // [{title: title, description: description, ...}]
  if (!data) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("pages/detail", { data });
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the listing!");
  req.flash("error", "Error deleting the listing!");
  res.redirect("/listings");
};
