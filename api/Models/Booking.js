const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Persons: { type: Number, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Visited: {
        type: String,
        enum: ["pending", "visited", "no-show"],
        default: "pending"
      }
});

module.exports = mongoose.model("Booking", bookingSchema);
