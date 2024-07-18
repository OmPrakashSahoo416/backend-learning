const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require("../middleware/auth")


const Story = require("../models/story");


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
router.get('/dashboard', ensureAuth, async (req, res) => {

     try {

        const stories = await Story.find({author:req.user.name}).lean();

        res.render("dashboard", {name:req.user.name, stories:stories, layout:"dashboard"});
        
     } catch (error) {

        console.error(error);
        
     }
})


module.exports = router;