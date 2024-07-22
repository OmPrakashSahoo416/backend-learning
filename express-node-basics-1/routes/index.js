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
        // const profile = req.user.profilePic
        // console.log(req.user)

        res.render("dashboard", {name:req.user.name, stories:stories, profile:req.user.profilePic,  layout:"dashboard"});
        
     } catch (error) {
        // console.log(req.user.id)

        console.error(error);
        
     }
})

router.get("/dashboard/delete/:id", async (req, res) => {
    const storyid = req.params.id;
    const story = await Story.deleteOne({_id:storyid}).lean();
    try {

        const stories = await Story.find({author:req.user.name}).lean();

        res.render("dashboard", {name:req.user.name, stories:stories, profile:req.user.profilePic, layout:"dashboard"});
        
     } catch (error) {

        console.error(error);
        
     }



})


module.exports = router;