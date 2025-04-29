const Booking = require('../Models/Booking');
const jwt = require('jsonwebtoken');

exports.bookTable = async (req, res) => {
    try {
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        const token = req.header("Authorization")?.split(" ")[1];
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded token:", decoded);

        const username = decoded.username;
        const { persons, date, time } = req.body;

        if (!persons || !date || !time) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new Booking({
            Username: username,
            Persons: persons,
            Date: date,
            Time: time,
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            status: 201,
            message: "Table booked successfully!",
            booking: savedBooking,
        });

    } catch (error) {
        console.error("Booking Error:", error.message);
        console.error("Stack Trace:", error.stack);  // 🪵 Important for debugging
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        const bookings = await Booking.find({ Username: username });

        res.status(200).json({
            status: 200,
            bookings,
        });
    } catch (error) {
        console.error("Fetch Booking Error:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

exports.updateVisitStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["visited", "no-show"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { Visited: status },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: `Booking marked as ${status}`,
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

