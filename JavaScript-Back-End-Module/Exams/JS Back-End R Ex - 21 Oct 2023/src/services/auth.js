const User = require("../models/User");
const { comparePassword } = require("../utils/encryption");
const jwt = require('jsonwebtoken')
const register = async ({ username, email, password }) => {

    try {
        const exsiting = await User.findOne({ email }).lean()

        if (exsiting) {
            throw new Error('Email is taken!');
        }

        const userPromise = new User({
            email,
            username,
            password
        });

        const user = await userPromise.save();

        const payload = {
            _id: user._id,
            email: user.email
        }

        const token = createSession(payload)

        return token;

    } catch (error) {
        throw error
    }
}

const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email }).lean();


        if (!user) {
            throw new Error('Incorrect username or password');
        }

        const hasMatch = await comparePassword(password, user.password);
        if (hasMatch == false) {
            throw new Error('Incorrect username or password');
        }

        const payload = {
            _id: user._id,
            email: user.email
        }

        const token = createSession(payload)
        return token;

    } catch (error) {
        throw error
    }

}

const createSession = (payload) => {

    const token = jwt.sign(payload, process.env.JWT_SECTER);
    return token;
}

const verifyToken = (token) => {

    return jwt.verify(token, process.env.JWT_SECTER)
}



module.exports = { verifyToken, login, register }