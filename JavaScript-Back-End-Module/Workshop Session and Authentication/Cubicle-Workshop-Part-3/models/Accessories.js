const mongoose = require('mongoose');

const accScheme = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'Invalid URL'], },
    description: { type: String, required: true, maxLength: 50 }
})

module.exports = mongoose.model('Accessory', accScheme);