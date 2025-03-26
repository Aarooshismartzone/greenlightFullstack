require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const csrf = require("csurf");
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

//const bcrypt = require('bcrypt');

const app = express();
const csrfProtection = csrf({ cookie: true });

//middleware
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (uploads)

//configure CORS
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "X-CSRF-Token"],
    credentials: true
};
app.use(cors(corsOptions));

//use CSRF globally in the project
app.use(csrfProtection);

//connection to mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connected to MongoDB:", err));

//connection to route
app.use('/api', csrfProtection, apiRoutes);

// The text or password to hash
//const password = 'GreenViewer108';

// Generate a salt and hash the password
// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) {
//     console.error('Error hashing password:', err);
//   } else {
//     console.log('Hashed Password is:', hash);
//   }
// });

//start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
