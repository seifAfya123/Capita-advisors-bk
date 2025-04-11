const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const midleware = require("../middlewares/authMiddleware");



router.get("/client/", serviceController.getAllServices);
router.get("/client/:serviceId", serviceController.clientgetServiceDetails);


router.post("/", midleware, serviceController.createService);
router.put("/:serviceId", midleware, serviceController.updateService);
router.delete("/:serviceId", midleware, serviceController.deleteService);
router.get("/", midleware, serviceController.getAllServices);
router.get("/:serviceId", midleware, serviceController.getServiceDetails);
// client


module.exports = router;
