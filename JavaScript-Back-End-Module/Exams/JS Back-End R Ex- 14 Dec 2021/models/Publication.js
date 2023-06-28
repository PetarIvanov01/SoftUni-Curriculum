const { Schema, model } = require('mongoose')

const pubSchema = new Schema({
    title: { type: String, required: true },
    technique: { type: String, required: true },
    picture: { type: String, required: true },
    certificate: { type: String, required: true },
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