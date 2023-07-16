const mongoose = require('mongoose')

exports.signup = async (req,res) => {
    const {name, email, password} = req.body;
    
    if (password.length < 8 ) throw "Password needs to be at least 8 characters"

};

exports.login = async (req,res) => {};

