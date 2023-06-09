const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessories');

async function createItem(type, data, user) {

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
            difficulty: Number(data.difficultyLevel),
            creatorId: user.userId
        })
    }
    await result.save();

    return result._id
}

async function getById(id) {

    let result = Cube.findById(id).lean();

    return result

}

async function deleteById(id) {

    await Cube.deleteOne({ _id: id })
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

async function updateById(id, newData) {
    try {
        const item = await Cube.findById(id);

        if (item) {
            item.name = newData.name;
            item.description = newData.description;
            item.imageUrl = newData.imageUrl;
            item.difficulty = Number(newData.difficultyLevel);

            await item.save();
            console.log('Item updated successfully');
            return item._id

        } else {
            throw new Error('Item not Found');
        }
    } catch (err) {
        throw err
    }
}

module.exports = { updateById, deleteById, getDocument, getAllItems, getBySearch, createItem, getById, getAccessory, getPopulatedAcc, getAccessoryById };

