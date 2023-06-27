const { Schema, model } = require('mongoose')

const furnitureSchema = new Schema({

    make: { type: String, required: true, minlength: [4, 'Make must be at least 4 char long!'] },
    model: { type: String, required: true, minlength: [4, 'Model must be at least 4 char long!'] },
    year: { type: Number, required: true, min: [1950, 'Year must be between 1950 and 2050'], max: [2050, 'Year must be between 1950 and 2050'] },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number!'] },
    description: { type: String, required: true, minlength: [10, 'Description must be more than 10 char long!'] },
    img: { type: String, required: true },
    material: { type: String, default: '' },
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }

})

// Validate fields:
// · Make and Model must be at least 4 symbols long
// · The year must be between 1950 and 2050
// · The description must be more than 10 symbols
// · The price must be a positive number
// · Image URL is required
// · Material is optional

const Furniture = model('Furniture', furnitureSchema);
module.exports = Furniture;