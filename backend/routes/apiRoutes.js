const express = require('express');
const multer = require("multer");
const router = express.Router();
const galleryRoutes = require("./galleryRoutes");

const { submitContactForm, checkContactForm, checkIndividualContact } = require('../controllers/contactFormController');
const { register, login, verifyAuth } = require('../controllers/authController');
const blogController = require('../controllers/blogController');

// Configure Multer for image uploads
const blogImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/blogimages/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: blogImageStorage });

// Route to get CSRF token
router.get('/csrf-token', (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() })
});

//routes for login
router.post('/register', register);
router.post('/login', login);
router.get('/verify-auth', verifyAuth); // Auth verification route

//route for logout
router.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ message: "Logout successful" });
});

//route for submitting the form
router.post('/contact-form', submitContactForm);
//route for checking information in backend
router.get('/backend/check-contact-form', checkContactForm);
//route for checking individual data
router.get('/backend/check-contact-form/:id', checkIndividualContact);
router.use("/gallery", galleryRoutes);

// Blog routes
router.post('/blogs', upload.single('image'), blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:slug', blogController.getBlogBySlug);
router.put('/blogs/:slug', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:slug', blogController.deleteBlog);


module.exports = router;