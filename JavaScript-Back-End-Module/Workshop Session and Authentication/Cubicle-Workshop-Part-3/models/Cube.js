const mongoose = require('mongoose');

const cubeScheme = mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
    description: { type: String, required: true, min: 10, max: 50 },
    imageUrl: { type: String, required: true },
    difficulty: { type: Number, min: 1, max: 6 },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creatorId: {
        type: mongoose.Types.ObjectId, required: true, ref: 'User'
    }

});
module.exports = mongoose.model('Cube', cubeScheme);
