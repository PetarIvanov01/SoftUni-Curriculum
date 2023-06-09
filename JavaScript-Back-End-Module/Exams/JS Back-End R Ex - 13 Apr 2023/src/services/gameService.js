const Game = require('../models/Game');
const User = require('../models/User');

async function getAll() {

    return Game.find({}).lean();
}
async function getById(id) {

    return Game.findById(id).lean();
}
async function createItem(id, data) {

    try {
        const item = await Game.create({
            name: data.name,
            image: data.image,
            price: data.price,
            description: data.description,
            genre: data.genre,
            platform: data.platform,
            owner: id
        });

    } catch (error) {
        throw error
    }

}
async function editItem(id, data) {

    try {
        let item = await Game.findById(id);

        item.platform = data.platform
        item.name = data.name
        item.image = data.image
        item.price = data.price
        item.genre = data.genre
        item.description = data.description
        await item.save();

    } catch (error) {
        throw error
    }

}
async function deleteItem(id) {
    await Game.findByIdAndDelete(id);
}

async function checkIsBought(userId, itemId) {
    if (userId) {
        const item = await Game.findById(itemId);
        return item.boughtBy.includes(userId);

    }
    return null
}
async function onBought(itemId, userId) {
    if (userId) {
        const item = await Game.findById(itemId);
        item.boughtBy.push(userId);
        await item.save();
    }
}

async function searchGames(name, platform) {
    try {
        return await Game.find({ name: { $regex: new RegExp(name, 'i') }, platform: { $regex: new RegExp(platform, 'i') } }).lean();
    } catch (error) {
        throw error
    }
}

module.exports = { getAll, getById, createItem, editItem, deleteItem, checkIsBought, onBought, searchGames }