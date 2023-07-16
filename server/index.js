const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')


const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DB_CONNECTION_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to MongoDB")
});

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running like Usain Bolt!")
})
