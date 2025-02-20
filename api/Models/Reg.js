const mongoose = require("mongoose");

const regSchema = mongoose.Schema({

    Username: { type: String,required: true },
    Password: { type: String,required: true },
    Email: { type: String,required: true }

})

module.exports = mongoose.model("Reg", regSchema)