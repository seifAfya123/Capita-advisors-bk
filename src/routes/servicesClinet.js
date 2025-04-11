const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");



// make them take language
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.clientgetServiceDetails);


module.exports = router;