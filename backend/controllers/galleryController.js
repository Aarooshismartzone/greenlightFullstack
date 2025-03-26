const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

exports.upload = multer({ storage });

// Upload Image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const { alt_tag } = req.body;
        const newImage = new Gallery({
            image_path: `/uploads/${req.file.filename}`,
            alt_tag
        });

        await newImage.save();
        res.status(201).json({ message: "Image uploaded successfully", data: newImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch All Images
exports.getAllImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Image
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Gallery.findById(id);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Delete the image file from filesystem
        const imagePath = path.join(__dirname, "../public", image.image_path);
        fs.unlink(imagePath, async (err) => {
            if (err && err.code !== "ENOENT") {
                return res.status(500).json({ error: "Error deleting image file" });
            }

            // Remove entry from database
            await Gallery.findByIdAndDelete(id);
            res.status(200).json({ message: "Image deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
