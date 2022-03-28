const passport = require('passport');
const ctrl= {}; 

ctrl.renderSignUp = (req, res) => {
  res.render("authentication/signup", {
    layout: "nostats",
  });
};

ctrl.renderSignIn = (req, res) => {
  res.render("authentication/signin", {
    layout: "nostats",
  });
};

ctrl.signUp = passport.authenticate("signup", {
  successRedirect: "/auth/signin",
  failureRedirect: "/auth/signup",
  failureFlash: true,
});

ctrl.signIn = passport.authenticate("signin", {
  successRedirect: "/",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

ctrl.profile = (req, res) => {
  res.render("authentication/profile");
};

ctrl.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

ctrl.indexAdmin = (req, res) => {
  res.render("indexAdmin", {
    layout: "nostats",
  });
};

module.exports = ctrl;