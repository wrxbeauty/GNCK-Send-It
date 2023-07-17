const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the token and exclude the password field
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // If the token verification fails, return an error response
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token is found in the authorization header, return an error response
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
