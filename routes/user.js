const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  getSignUpForm,
  SignUp,
  getLoginForm,
  Logout,
} = require("../controllers/user.js");

router
  .route("/signup")
  .get(getSignUpForm) // Sign up form
  .post(SignUp); // Sign up route

router
  .route("/login")
  .get(getLoginForm) // Login form
  .post(
    // Login route
    saveRedirectUrl, // save the original URL before authentication
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    (req, res) => {
      req.flash("success", "Welcome back!");
      res.redirect(res.locals.redirectUrl || "/listings"); // redirect to the original URL
    }
  );

// Logout route
router.get("/logout", Logout);

module.exports = router;
