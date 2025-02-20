const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    Username: { type: String, required: true }, // Linked to registered user
    Persons: { type: Number, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);
