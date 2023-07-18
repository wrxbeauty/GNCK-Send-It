// Importing the mongoose library
const mongoose = require("mongoose");
// Importing the bcryptjs library for password hashing
const bcrypt = require("bcryptjs");

// Defining the userSchema schema using mongoose.Schema()
const userSchema = mongoose.Schema(
  {
    // Defining a field called name of type String which is required
    name: { type: "String", required: true },

    // Defining a field called email of type String which is unique and required
    email: { type: "String", unique: true, required: true },

    // Defining a field called password of type String which is required
    password: { type: "String", required: true },

    // Defining a field called pic of type String which is required with a default value
    pic: {
      type: "String",
      // required: true,
      default:
        "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg",
    },

    // Defining a field called isAdmin of type Boolean which is required with a default value of false
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Adding timestamps to the schema, which automatically adds createdAt and updatedAt fields
  { timestaps: true }
);

// Adding a custom method to the userSchema for password comparison
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Adding a pre-save middleware to the userSchema for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the user's password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating a mongoose model named "User" using the userSchema schema
const User = mongoose.model("User", userSchema);

// Exporting the User model to make it available for other parts of the codebase
module.exports = User;
