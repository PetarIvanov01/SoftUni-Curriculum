const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'jocsngfjadsojoipdf12fp';

async function register(username, password, address) {

    try {
        const exsiting = await User.findOne({ username }).collation(({
            locale: 'en', strength: 2
        }));
        if (exsiting) {
            throw new Error('User with this username exist!')
        }

        const user = await User.create({
            username,
            password: await bcrypt.hash(password, 10),
            address
        });

        const payload = {
            _id: user._id,
            username: user.username,
        }
        payload.token = createToken(payload);

        return payload;
    } catch (error) {
        throw error;
    }
}

async function login(username, password) {
    try {
        const user = await User.findOne({ username }).lean();

        if (!user) {
            throw new Error('Invalid password or username!')
        }
        const hasMatch = await bcrypt.compare(password, user.password);

        if (hasMatch == false) {
            throw new Error('Incorrect username or password');
        }

        const payload = {
            _id: user._id,
            username: user.username,
        }
        payload.token = createToken(payload);

        return payload;
    } catch (error) {
        throw error;
    }
}
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {

    return jwt.verify(token, SECRET_KEY)
}


module.exports = { register, login, verifyToken }