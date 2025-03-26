const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    keywords: { type: String },
    image: { type: String, required: true },
    readtime: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);