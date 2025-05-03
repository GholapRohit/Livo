if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // for using environment variables in development mode
}
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const ExpressError = require("./utils/expressError");
const listings = require("./routes/listing");
const reviews = require("./routes/review");
const user = require("./routes/user");
const docs = require("./routes/docs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");

// Setting middlewares
app.set("view engine", "ejs"); // for using ejs as view engine
app.set("views", path.join(__dirname, "views")); // for using views folder
app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(methodOverride("_method")); // for using PUT and DELETE methods in forms
app.engine("ejs", ejsMate); // for using layout.ejs in views folder
app.use(express.static(path.join(__dirname, "public"))); // for using public folder

// Connect to MongoDB
const dbUrl = process.env.ATLASDB_URL;
async function connMongo() {
  await mongoose.connect(dbUrl);
}
connMongo()
  .then(() => {
    console.log("connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

// Session store configuration
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", function (e) {
  console.log("Session store error", e);
});

// Session configuration
const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); // for using passport
app.use(passport.session()); // for using passport session
passport.use(new localStrategy(User.authenticate())); // for using local strategy
passport.serializeUser(User.serializeUser()); // for serializing user
passport.deserializeUser(User.deserializeUser()); // for deserializing user

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // for using flash messages
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // for using current user in views
  next();
});

// Routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);
app.use("/docs", docs);

// Landing page
app.get("/", (req, res) => {
  res.render("pages/landing"); // for using home.ejs in views folder
});

//privacy and terms docs
app.get("/privacy", (req, res) => {
  res.render("pages/privacy");
});
app.get("/terms", (req, res) => {
  res.render("pages/terms");
});

// Error handling
app.use((req, res, next) => {
  next(new ExpressError("Page not found", 404));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  console.log(statusCode, message);
  res.status(statusCode).render("pages/error", { err });
});

// Checking connection
app.listen(8080, () => {
  console.log("Listening at http://localhost:8080/listings");
});
