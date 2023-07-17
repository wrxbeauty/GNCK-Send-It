const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true }, // Name of the user
    email: { type: "String", unique: true, required: true }, // Email of the user (unique constraint)
    password: { type: "String", required: true }, // Password of the user
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }, // Profile picture URL of the user
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    }, // Indicates if the user is an admin or not
  },
  { timestamps: true } // Adds timestamps for createdAt and updatedAt fields
);

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the generated salt
});

// Create the User model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
