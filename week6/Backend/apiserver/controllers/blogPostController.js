const mongoose = require('mongoose');
const BlogPost = require('../models/blogPostModel');

// get all getBlogPosts
const getBlogPosts = async (req, res) => {
    const user_id = req.user._id;
    try {
        const blogPosts = await BlogPost.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

// Add one addBlogPost
const addBlogPost = async (req, res) => {
  const { title, content, author, published, publishedDate } = req.body;
  
  try {
    const user_id = req.user._id;
    const newBlogPost = new BlogPost({ 
      title, 
      content, 
      author, 
      published, 
      publishedDate, 
      user_id 
    });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get getBlogPost by ID
const getBlogPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blogpost' });
  }

  try {
    const user_id = req.user._id;
    const blogPost = await BlogPost.findById(id).where('user_id').equals(user_id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error'});
  }
}

// Delete deleteBlogPost by ID
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const blogPost = await BlogPost.findByIdAndDelete({ _id: id, user_id });
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error'});
  }
}
   
// Update updateBlogPost by ID
const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        const user_id = req.user._id;
        const blogPost = await BlogPost.findOneAndUpdate(
            { _id: id, user_id: user_id },
            { ...req.body },
            { new: true }
        );
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

module.exports = {
  getBlogPosts,
  addBlogPost,
  getBlogPost,
  deleteBlogPost,
  updateBlogPost,
};