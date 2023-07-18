const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (id) => {
  // The jwt.sign method is used to generate the token
  // The payload contains the user ID
  // The process.env.JWT_SECRET is the secret key used to sign the token
  // The expiresIn option specifies the token's expiration time (30 days in this case)
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken; // Export the generateToken function for use in other modules
