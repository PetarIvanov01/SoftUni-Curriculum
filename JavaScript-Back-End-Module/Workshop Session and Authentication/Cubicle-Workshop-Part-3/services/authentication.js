const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'secretKey';

async function registerUser(username, password) {

    try {
        if (await User.findOne({ username: username })) {

            throw new Error('User exist!');
        }

        const user = new User({
            username,
            password: await bcrypt.hash(password, 10)
        })

        const savedUser = await user.save();
        const userId = savedUser._id;

        const token = jwt.sign({ userId }, secretKey);
        return token

    } catch (error) {

        throw error
    }

}
async function loginUser(username, password) {

    const user = await User.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } }).lean();

    try {
        if (user == undefined || await bcrypt.compare(password, user.password) == false) {
            throw new Error('Invalid username or password!');
        }
        const userId = user._id;

        const token = jwt.sign({ userId }, secretKey);
        return token

    } catch (error) {

        throw error
    }
}

function verifToken(token) {
    return jwt.verify(token, secretKey)
}




module.exports = { registerUser, loginUser, verifToken }