const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utils/encryption');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                return emailPattern.test(v);
            },
            message: v => `${v.value} is not valid email`
        },
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
});
schema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }
    next();
})
schema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', schema);

module.exports = User;