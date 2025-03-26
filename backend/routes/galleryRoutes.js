const express = require("express");
const { uploadImage, getAllImages, upload, deleteImage } = require("../controllers/galleryController");

const router = express.Router();

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/all", getAllImages);
router.delete("/delete/:id", deleteImage); // New DELETE Route

module.exports = router;

