const express = require("express");
const router = express.Router();
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





module.exports = router;