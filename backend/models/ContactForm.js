const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContactForm', contactFormSchema);