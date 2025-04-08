const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const sectionController = require("../controllers/sectionController");
const questionController = require("../controllers/questionController");
const serviceController = require("../controllers/serviceController");
const contactUsController = require("../controllers/contactUsController");

// Company Routes
router.post("/companies", companyController.createCompany);
router.get("/companies", companyController.getAllCompanies);
router.patch("/companies/:companyId/status", companyController.changeCompanyStatus);

// Section Routes
router.post("/sections", sectionController.createSection);
router.put("/sections/:sectionId", sectionController.updateSection);
router.delete("/sections/:sectionId", sectionController.deleteSection);

// Question Routes
router.post("/questions", questionController.createQuestion);
router.put("/questions/:questionId", questionController.updateQuestion);
router.delete("/questions/:questionId", questionController.deleteQuestion);

// Service Routes
router.post("/services", serviceController.createService);
router.put("/services/:serviceId", serviceController.updateService);
router.delete("/services/:serviceId", serviceController.deleteService);
router.get("/services", serviceController.getAllServices);
router.get("/services/:serviceId", serviceController.getServiceDetails);

// Contact Us Routes
router.post("/contact-us", contactUsController.sendContactRequest);
router.get("/contact-us", contactUsController.getContactRequests);
router.patch("/contact-us/:requestId/toggle-starred", contactUsController.toggleStarredStatus);


module.exports = router;
