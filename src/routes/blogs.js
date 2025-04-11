const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require('../middlewares/authMiddleware');

//!__________ Admin Side ____________
// Create blog
// get all blogs
// Delete blog by id
// Update blog by id
router.post("/",authMiddleware, blogController.createBlog); // Create blog
router.get("/",authMiddleware, blogController.getAllBlogsAdmin); // Get all blogs
router.put("/:id",authMiddleware, blogController.updateBlog); // Update blog by ID
router.delete("/:id",authMiddleware, blogController.deleteBlog); // Delete blog by ID
router.get("/:id",authMiddleware, blogController.getBlogByIdAdmin); // Delete blog by ID

//!__________ Client Side ____________
// Get blog By ID
// Get All blogs
// // Get Recent blogs
// router.get("/client/", blogController.getAllBlogs);
// router.get("/clinet/:id", blogController.getBlogById); 
// router.get("/clinet/recent", blogController.getRecentBlogs);
module.exports = router;
