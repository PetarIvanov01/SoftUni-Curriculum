const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [4, 'Username must be at least 4 characters long'] },
    image: {
        type: String, required: true, validate: {
            validator: function (value) {
                return /^https?:\/\//.test(value);
            },
            message: "Image URL must start with 'http://' or 'https://'."
        }
    },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number!'] },
    description: { type: String, required: true, minlength: [10, 'Username must be at least 10 characters long'] },
    genre: { type: String, required: true, minlength: [2, 'Username must be at least 2 characters long'] },
    platform: {
        type: String, required: true, enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"]
    },
    boughtBy: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
