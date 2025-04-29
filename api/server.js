require('dotenv').config(); // 👈 Load environment variables FIRST

const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.json())

const frontendRoutes = require("./Router/frontendRoutes")
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/cafeProject');
  
  

app.use("/api" , frontendRoutes)
app.use(express.static("Public"))
app.listen(5000 , ()=>{
    console.log("server is running on port 5000")
})