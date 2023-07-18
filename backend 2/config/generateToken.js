const jwt = require("jsonwebtoken");

// Function to generate a JWT token with the provided user ID
const generateToken = (id) => {
  // Sign the payload (in this case, the user ID) with a secret key and generate a token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set the expiration time for the token (30 days)
  });
};

module.exports = generateToken;
