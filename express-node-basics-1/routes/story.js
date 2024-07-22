const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const {ensureAuth} = require("../middleware/auth")


const Story = require("../models/story");

// add story route 
router.get("/add",ensureAuth, async (req, res, cb) => {

    res.render("stories/add");
})

// submitting the form component in add page 
router.post("/", ensureAuth, async (req, res, cb) => {
    
    try {
        req.body.user = req.user.id;
        await Story.create(req.body)
        res.redirect("/dashboard")
        
    } catch (error) {
        console.error(error);
    }
    
})

// to show public posts in a page 
router.get("/publicStories", ensureAuth, async (req, res, next) => {
    const stories = await Story.find().lean();
    res.render("publicStories", {stories:stories, profile:req.user.profilePic, layout:"dashboard"})

})

router.get(`/:id`, async (req, res, next) => {
    const ID = req.params.id;

    // to match the id with the url so that only that contents are visible when we click on 
    const story = await Story.find({_id:ID}).lean();
    console.log(story)
    res.render("stories/story", {story:story, profile:req.user.profilePic, layout:"dashboard"})
})






module.exports = router;