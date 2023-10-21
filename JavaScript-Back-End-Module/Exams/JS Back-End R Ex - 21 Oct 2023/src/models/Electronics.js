const { Schema, Types, model } = require('mongoose');

const electronicSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [10, 'Name should be at least 10 characters long'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    minlength: [2, 'Type should be at least 2 characters long'],
  },
  damages: {
    type: String,
    required: [true, 'Damages is required'],
    minlength: [10, 'Damages should be at least 10 characters long'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: value => /^https?:\/\//.test(value),
      message: 'Image URL must start with http:// or https://',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description should be at least 10 characters long'],
    maxlength: [200, 'Description should be at most 200 characters long'],
  },
  production: {
    type: Number,
    required: [true, 'Production year is required'],
    min: [1900, 'Production year must be greater than or equal to 1900'],
    max: [2023, 'Production year must be less than or equal to 2023'],
  },
  exploitation: {
    type: Number,
    required: [true, 'Exploitation must be specified'],
    min: [0, 'Exploitation must be a positive number'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  buyingList: [
    {
      user: {
        type: Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Electronic = model('Electronic', electronicSchema);

module.exports = Electronic;
