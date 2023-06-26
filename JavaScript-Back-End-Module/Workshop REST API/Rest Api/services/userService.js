const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'DKASDKASDP121DKPSA';

const blacklist = new Set();
async function login(email, password) {
    try {

        const existing = await User.findOne({ email: email })

        if (!existing) {
            throw new Error('Incorrect username or password');
        }
        const verifyPass = await bcrypt.compare(password, existing.hashedPassword);

        if (!verifyPass) {
            throw new Error('Incorrect username or password');
        }

        const payload = {
            _id: existing._id,
            email: existing.email,
        }

        const token = createPayload(payload);
        payload.accessToken = token

        return payload;

    } catch (error) {
        throw error
    }
}
async function register(email, password) {

    try {

        const existing = await User.findOne({ email: email })

        if (existing) {
            throw new Error('Email is already taken!');
        }

        const user = await User.create({
            email,
            hashedPassword: await bcrypt.hash(password, 10)
        });

        const payload = {
            _id: user._id,
            email: user.email,
        }

        const token = createPayload(payload);
        payload.accessToken = token

        return payload;
    } catch (error) {

        throw error
    }

}
async function logout(token) {

    blacklist.add(token);

}

function createPayload(payload) {

    return jwt.sign(payload, SECRET_KEY);

}
function parseToken(token) {
    if (blacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }
    const result = jwt.verify(token, SECRET_KEY);
    return result
}
module.exports = { parseToken, logout, register, login }