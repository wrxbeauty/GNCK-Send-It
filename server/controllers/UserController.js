const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (password.length < 8) throw "Password needs to be at least 8 characters"

    const user = new User({ name, email, password: sha256(password + process.env.SALT), });

    await user.save()

    res.json({
        message: "Successfully created new user [" + name + "]"
    })
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password: sha - 256(password + process.env.SALT), });

    if (!user) throw "invalid username or password";

    const token = jwt.sign({id: user.id }, process.env.SECRET)

    res.json({
        message:"User logged in successfully!",
        token,
    });
};

