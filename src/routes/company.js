// Company Routes
const companyController = require("../controllers/companyController");
const router = require("express").Router();
const middlewares = require("../middlewares/authMiddleware");

router.post("/admin/", middlewares, companyController.createCompany);
router.get("/admin/", middlewares, companyController.getAllCompanies);
router.delete("/admin/:companyId", middlewares, companyController.deleteCompany);
router.put(
  "/admin/:companyId",
  middlewares,
  companyController.changeCompanyStatus
);

router.get("/clinet/", companyController.clientgetAllCompanies);
router.get("/clinet/:companyId", companyController.getCompanyDetails);
module.exports = router;
