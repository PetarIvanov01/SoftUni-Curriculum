const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [4, 'Username must be at least 4 characters'] },
    password: { type: String, required: true, minlength: [3, 'Password must be at least 3 characters'] },
    address: { type: String, required: true, minlength: [15, 'Address must be at least 15 characters'] },
    sharedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Publication'
    }],
    ownPublications: [{
        type: Schema.Types.ObjectId,
        ref: 'Publication'
    }],
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;