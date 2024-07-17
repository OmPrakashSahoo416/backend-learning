const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../middleware/auth")


// route @ /login
router.get('/login', ensureGuest, (req, res) => {
    res.render("login", {
        layout:"login"
    });
})


// router.get('/logout', function(req, res, next){
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   });

// route @ /
router.get('/', ensureGuest, (req, res) => {
    res.render("home");
})
// route @ /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render("dashboard", {name:req.user.name, layout:"dashboard"});
})


module.exports = router;