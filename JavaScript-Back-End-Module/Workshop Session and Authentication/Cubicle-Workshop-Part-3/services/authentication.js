const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function registerUser(username, password) {

    const user = new User({
        username,
        password: await hashedFunc(password)
    })

    const savedUser = await user.save();
    const userId = savedUser._id;

    // Generate JWT with user ID
    const token = jwt.sign({ userId }, 'secretKey');

    return token
}
async function compareHash(password, hash) {
    return bcrypt.compare(password, hash);
}


async function hashedFunc(password) {
    return bcrypt.hash(password, 10);
}

module.exports = { registerUser, compareHash }