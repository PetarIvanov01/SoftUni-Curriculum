const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessories')

async function createItem(type, data) {

    let result;
    if (type == 'acc') {

        result = new Accessory({
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
        });
    }
    else if (type == 'cube') {

        result = new Cube({
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            difficulty: Number(data.difficultyLevel)
        })
    }
    await result.save();

    return result._id
}

async function getById(id) {

    let result = Cube.findById(id).lean();

    return result

}

async function getAllItems() {

    const items = Cube.find({}).lean();

    return items;
}

async function getBySearch(name, from, to) {

    const regex = new RegExp('^' + name.toLowerCase() + '$', 'i'); // Case-insensitive search

    const items = await Cube.find({
        name: { $regex: regex },
        difficulty: { $gte: from, $lte: to }
    }).lean();


    return items
}

async function getAccessory(currCube) {

    const accessories = Accessory.find({ _id: { $nin: currCube.accessories } }).lean();

    return accessories
}

async function getPopulatedAcc(id) {

    const accessories = Cube.findById(id).populate('accessories').lean();
    return accessories
}

async function getAccessoryById(id) {

    const accessorie = Accessory.findById(id).lean();
    return accessorie
}

async function getDocument(id) {

    return Cube.findById(id)
}

module.exports = { getDocument, getAllItems, getBySearch, createItem, getById, getAccessory, getPopulatedAcc, getAccessoryById };

