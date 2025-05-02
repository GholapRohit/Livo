const User = require("../models/user");

module.exports.getSignUpForm = (req, res) => {
  res.render("pages/signup");
};

module.exports.SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log("New User:", registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash("success", "Successfully signed up!");
      req.flash("error", "Error signing up!");
      return res.redirect("/listings");
    });
  } catch (e) {
    console.log(e);
    req.flash("error", e.message);
    return res.redirect("/signup");
  }
};

module.exports.getLoginForm = (req, res) => {
  res.render("pages/login");
};

module.exports.Logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out successfully!");
    res.redirect("/listings");
  });
};
