const ContactForm = require('../models/ContactForm');

//handle form submission
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, address, phone, message } = req.body;

        const newContact = new ContactForm({ name, email, address, phone, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Form submitted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting form", error });
    }
};

//check contact form
exports.checkContactForm = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve the token from cookies
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const formData = await ContactForm.find();
        res.status(200).json(formData)
    } catch (error) {
        console.error("Error fetching contact forms:", error);
        res.status(500).json({ error: "Server error. Unable to fetch contact forms." });
    }
};

//check individual contact
exports.checkIndividualContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const formData = await ContactForm.findById(contactId);
        res.status(200).json(formData)
    } catch (error) {
        console.error("Error fetching contact forms:", error);
        res.status(500).json({ error: "Server error. Unable to fetch contact forms." });
    }
};