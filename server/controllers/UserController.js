const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256')

exports.signup = async (req,res) => {
    const {name, email, password} = req.body;
    
    if (password.length < 8 ) throw "Password needs to be at least 8 characters"

    const user = new User({name, email, password: sha256(password + process.env.SALT)});

    await user.save()
};

exports.login = async (req,res) => {};

