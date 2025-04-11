const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

//!__ Client Side __
// Get blog By ID
// Get All blogs
// // Get Recent blogs
router.get("/clinet/", blogController.getAllBlogs); //working
router.get("/clinet/recent", blogController.getRecentBlogs); // working

router.get("/clinet/:id", blogController.getBlogById); //working

//!__ Admin Side __
// Create blog
// get all blogs
// Delete blog by id
// Update blog by id
router.post("/", authMiddleware, blogController.createBlog); // Create blog
router.get("/", authMiddleware, blogController.getAllBlogsAdmin); // Get all blogs
router.put("/:id", authMiddleware, blogController.updateBlog); // Update blog by ID
router.delete("/:id", authMiddleware, blogController.deleteBlog); // Delete blog by ID
router.get("/:id", authMiddleware, blogController.getBlogByIdAdmin); // Delete blog by ID

module.exports = router;