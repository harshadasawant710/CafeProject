const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

exports.bookTable = async (req, res) => {
    try {
        // Get the token from headers
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username; // Extract username from decoded token

        const { persons, date, time } = req.body;

        // Validate input
        if (!persons || !date || !time) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new Booking({
            Username: username, // Save the username from the token
            Persons: persons,
            Date: date,
            Time: time,
        });

        await newBooking.save();

        res.status(201).json({
            message: "Table booked successfully!",
            booking: newBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
