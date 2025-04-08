const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

//!__________ Admin Side ____________
// Create blog
// get all blogs
// Delete blog by id
// Update blog by id
router.post("/", blogController.createBlog); // Create blog
router.get("/", blogController.getAllBlogsAdmin); // Get all blogs
router.put("/:id", blogController.updateBlog); // Update blog by ID
router.delete("/:id", blogController.deleteBlog); // Delete blog by ID

//!__________ Client Side ____________
// Get blog By ID
// Get All blogs
// Get Recent blogs
router.get("/clinet/", blogController.getAllBlogs); // Get all blogs
router.get("/clinet/:id", blogController.getBlogById); // Get single blog by ID
router.get("/clinet/recent", blogController.getRecentBlogs);
module.exports = router;
