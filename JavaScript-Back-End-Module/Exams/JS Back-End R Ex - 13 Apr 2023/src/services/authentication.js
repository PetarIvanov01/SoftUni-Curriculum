const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'secretKey';

async function registerUser(username, email, password) {

    try {
        const exsiting = await User.findOne({ username }).collation(({
            locale: 'en', strength: 2
        }));

        if (exsiting) {
            throw new Error('User is taken!');
        }

        const user = await User.create({
            username,
            email,
            password: await hashedFunc(password)
        })

        const token = createSession(user._id, user.username, user.email);
        return token;

    } catch (error) {

        throw error
    }

}

async function loginUser(email, password) {

    try {
        const user = await User.findOne({ email }).collation(({
            locale: 'en', strength: 2
        }));
        if (!user) {
            throw new Error('Incorrect username or password');
        }
        const hasMatch = await bcrypt.compare(password, user.password);
        if (hasMatch == false) {
            throw new Error('Incorrect username or password');
        }

        const token = createSession(user._id, user.username, user.email)
        return token;

    } catch (error) {

        throw error
    }
}

function createSession(_id, username, email) {
    const payload = {
        _id,
        username,
        email
    };

    const token = jwt.sign(payload, secretKey);
    return token;
}

async function hashedFunc(password) {

    return bcrypt.hash(password, 10);
}

function verifyToken(token) {

    return jwt.verify(token, secretKey);
}

module.exports = { registerUser, loginUser, verifyToken }