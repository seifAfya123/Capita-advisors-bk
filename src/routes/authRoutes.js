const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authController")


// ! _____________ Admin Login ________________
router.post("/login",authcontroller.login)
router.post("/register",authcontroller.register)

module.exports = router