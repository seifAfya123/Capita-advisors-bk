// Company Routes
const companyController = require("../controllers/companyController");
const router = require("express").Router()

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanies);
router.patch("/:companyId/status", companyController.changeCompanyStatus);

module.exports= router