const jwt = require("jsonwebtoken");
const ContactForm = require("../models/ContactForm");

// Handle form submission (Public, No Authentication Required)
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, address, phone, message } = req.body;
        const newContact = new ContactForm({ name, email, address, phone, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Form submitted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting form", error: error.message });
    }
};

// Middleware to Verify JWT Token (For Protected Routes)
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Check all contact forms (Protected)
exports.checkContactForm = async (req, res) => {
    try {
        const formData = await ContactForm.find();
        res.status(200).json(formData);
    } catch (error) {
        console.error("Error fetching contact forms:", error);
        res.status(500).json({ error: "Server error. Unable to fetch contact forms." });
    }
};

// Check individual contact (Protected)
exports.checkIndividualContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const formData = await ContactForm.findById(contactId);
        if (!formData) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(formData);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid contact ID" });
        }
        console.error("Error fetching contact:", error);
        res.status(500).json({ error: "Server error. Unable to fetch contact form." });
    }
};

// Delete contact (Protected)
exports.deleteContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await ContactForm.findById(contactId);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await ContactForm.findByIdAndDelete(contactId);
        res.json({ message: "Contact deleted successfully" });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid contact ID" });
        }
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Server error. Unable to delete contact." });
    }
};

// Apply JWT Middleware to Protected Routes
exports.checkContactForm = [verifyToken, exports.checkContactForm];
exports.checkIndividualContact = [verifyToken, exports.checkIndividualContact];
exports.deleteContact = [verifyToken, exports.deleteContact];
