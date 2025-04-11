const router = require("express").Router();
const companyRoutes = require("./company");
const authRoutes = require("./authRoutes");
const contactRoutes = require("./contactUs");
const blogsRoutes = require("./blogs");
const clientblogsRoutes = require("./blogsClient");
const metaRoutes = require("./metadata");
const servicesRoutes = require("./services");
const clinetServicesRoutes = require("./servicesClinet");

router.get("/", (req, res) => res.status(200).json({ message: "hellow" }));

// ! service ____________
router.use("/api/services", servicesRoutes);
// ! MetaData ____________
router.use("/api/metadata", metaRoutes);
// ! Company ____________
router.use("/api/companies", companyRoutes);
// ! Auth ____________
router.use("/api/admin", authRoutes);
// ! Contact Requstes ____________
router.use("/api/contact", contactRoutes);
// ! Blogs ____________
router.use("/api/blogs", blogsRoutes);

module.exports = router;
