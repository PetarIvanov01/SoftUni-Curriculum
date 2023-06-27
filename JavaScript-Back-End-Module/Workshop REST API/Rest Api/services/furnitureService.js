const Furniture = require("../models/Furniture");
const { Schema } = require('mongoose')

async function create(data, userId) {

    try {

        const furniture = await Furniture.create(data);
        furniture._ownerId = userId;

        furniture.save();

    } catch (error) {
        throw error
    }
}

async function getAll() {
    return await Furniture.find({}).lean();
}
async function getById(id) {
    return await Furniture.findOne({ _id: id }).lean();
}
async function getOwnerItems(ownerId) {
    try {
        return await Furniture.find({ _ownerId: ownerId }).lean();

    } catch (error) {
        throw error
    }
}

async function deleteItem(_id) {
    try {
        await Furniture.findOneAndDelete(_id);
    } catch (error) {
        throw error
    }

}

async function editItem(_id, body) {

    try {
        const item = await Furniture.findOne({ _id });
        item.make = body.make;
        item.model = body.model;
        item.year = body.year;
        item.price = body.price;
        item.description = body.description;
        item.img = body.img;
        item.material = body.material;

        item.save();
    } catch (error) {
        throw error
    }
}

module.exports = { create, getById, getAll, getOwnerItems, deleteItem, editItem }