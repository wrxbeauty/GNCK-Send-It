const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields.");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    // Create the user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    // If user creation is successful, send a response with user details and a token
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
        // Send a response with user details and a token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

// Get all users
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
              ],
          }
        : {};

    // Find all users based on the provided keyword
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    // Send a response with the found users
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
