const express = require('express');
const router = express.Router();
const { getBlogPosts, addBlogPost, getBlogPost, deleteBlogPost, updateBlogPost } = require('../controllers/blogPostController');
const {requireAuth, admin} = require('../middleware/requireAuth');

// Require authentication for all routes
router.use(requireAuth);

// Get all blog posts
router.get('/', getBlogPosts, admin);

// Post a blog post
router.post('/', addBlogPost);

// Get a single blog post
router.get('/:id', getBlogPost);

// Delete a blog post
router.delete('/:id', deleteBlogPost);

// Update a blog post using put
router.put('/:id', updateBlogPost);

module.exports = router;