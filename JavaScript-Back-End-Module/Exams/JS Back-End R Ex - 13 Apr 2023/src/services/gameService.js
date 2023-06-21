const Game = require('../models/Game')

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

}
async function deleteItem(id) {

}

module.exports = { getAll, getById, createItem, editItem, deleteItem }