const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
require("dotenv").config();
const userRoute = require('./routes/userRoute');

const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute)

mongoose.connect(process.env.DB_CONNECTION_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch((err) => {
    console.log(err.message)
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running like Usain Bolt!")
})
