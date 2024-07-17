const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/login", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/access_verify/",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

router.post("/logout", ensureAuth, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// route @ /
// router.get('/', (req, res) => {
//     res.render("home");
// })
// // route @ /dashboard
// router.get('/dashboard', (req, res) => {
//     res.render("dashboard");
// })

module.exports = router;
