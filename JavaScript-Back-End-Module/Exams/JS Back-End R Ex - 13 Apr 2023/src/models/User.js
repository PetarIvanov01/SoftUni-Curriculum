const mongoose = require('mongoose');

const User = new mongoose.Schema({

    username: { type: String, required: true, minlength: [5, 'Username must be at least 5 characters long'] },
    email: { type: String, required: true, minlength: [10, 'Email must be at least 10 characters long'] },
    password: { type: String, required: true, minlength: [4, 'Password must be at least 4 characters long'] }

})
User.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
User.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

module.exports = mongoose.model('User', User)