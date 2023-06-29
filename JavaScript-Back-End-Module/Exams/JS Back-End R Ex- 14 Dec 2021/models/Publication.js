const { Schema, model } = require('mongoose')

const pubSchema = new Schema({

    title: { type: String, required: true, minlength: [6, 'Title must be at least 6 characters'] },
    technique: { type: String, required: true, maxlength: [15, 'Painting technique must be at maximum 15 characters'] },
    picture: {
        type: String, required: true,
        validator: function (value) {
            const urlPattern = /^(http:\/\/|https:\/\/)/;
            return urlPattern.test(value);
        },
        message: 'Art picture should start with "http://" or "https://"'
    },
    certificate: { type: String, required: true, enum: ['Yes', 'No'] },
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _shared: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

})

const Publication = model('Publication', pubSchema);
module.exports = Publication;