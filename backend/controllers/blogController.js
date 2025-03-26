const BlogPost = require('../models/BlogPost');
const path = require('path');
const fs = require('fs');

// Create Blog Post
exports.createBlog = async (req, res) => {
    try {
        const { title, slug, content, keywords, readtime } = req.body;
        if (!req.file) return res.status(400).json({ message: "Image is required" });

        const newPost = new BlogPost({
            title,
            slug,
            content,
            keywords,
            image: `/blogimages/${req.file.filename}`,
            readtime
        });

        await newPost.save();
        res.status(201).json({ message: "Blog created successfully", blog: newPost });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error: error.message });
    }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

// Get Blog by Slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await BlogPost.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error: error.message });
    }
};

// Update Blog Post
exports.updateBlog = async (req, res) => {
    try {
        const { title, slug, content, keywords, readtime } = req.body;
        const blog = await BlogPost.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        let imagePath = blog.image;
        if (req.file) {
            // Delete old image
            fs.unlinkSync(path.join(__dirname, '..', 'public', blog.image));
            imagePath = `/blogimages/${req.file.filename}`;
        }

        const updatedBlog = await BlogPost.findOneAndUpdate(
            { slug: req.params.slug },
            { title, slug, content, keywords, image: imagePath, readtime },
            { new: true }
        );

        res.json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error: error.message });
    }
};

// Delete Blog Post
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        fs.unlinkSync(path.join(__dirname, '..', 'public', blog.image));
        await BlogPost.deleteOne({ slug: req.params.slug });

        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};
