const mongoose = require("mongoose")

const foodSchema = mongoose.Schema({

    PName: { type: String },
    PPrice: { type: Number },
    PDesc: { type: String },
    PQty: { type: Number },
    PStatus: { type: String, default: "IN-STOCK" },
    PImg: { type: String }
})

module.exports = mongoose.model("Foods", foodSchema)