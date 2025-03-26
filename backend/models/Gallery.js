const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image_path: {type: String, required: true},
    alt_tag: {type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);