const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    ownPublications: [{
        type: mongoose.Schema.Types.ObjectId,
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