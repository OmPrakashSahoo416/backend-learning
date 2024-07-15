const express = require("express");
const router = express.Router();

// route @ /login
router.get('/login', (req, res) => {
    res.render("login", {
        layout:"login"
    });
})

// route @ /
router.get('/', (req, res) => {
    res.render("home");
})
// route @ /dashboard
router.get('/dashboard', (req, res) => {
    res.render("dashboard");
})


module.exports = router;