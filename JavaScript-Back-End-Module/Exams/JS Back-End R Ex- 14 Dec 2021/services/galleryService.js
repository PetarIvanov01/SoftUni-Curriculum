const User = require('../models/User');
const Publication = require("../models/Publication");

async function create(userId, body) {
    try {
        const user = await User.findById({ _id: userId });

        const item = await Publication.create({
            title: body.title,
            technique: body.technique,
            picture: body.picture,
            certificate: body.certificate,
        })

        user.ownPublications.push(item._id);
        await user.save();

        item._author = userId;
        await item.save();

    } catch (error) {
        throw error
    }
}

async function getAll() {
    try {
        return await Publication.find({}).lean();
    } catch (error) {
        throw error
    }
}

async function getById(_id) {
    try {
        return Publication.findById({ _id }).lean();
    } catch (error) {
        throw error
    }

}

async function getDetails(_id) {
    try {
        return await Publication.findById(_id).populate('_author').lean();
    } catch (error) {
        throw error
    }
}

async function editById(_id, body) {
    try {
        const item = await Publication.findById(_id);

        item.title = body.title
        item.technique = body.technique
        item.picture = body.picture
        item.certificate = body.certificate

        await item.save()
    } catch (error) {
        throw error
    }
}

async function getUserProfile(_id) {
    try {
        const user = await User.findById(_id).populate('ownPublications').populate('sharedPosts').lean();

        const ownPosts = user.ownPublications.map(v => v.title).join(', ');
        const sharedPosts = user.sharedPosts.map(v => v.title).join(', ');

        const response = {
            address: user.address,
            username: user.username,
            sharedPosts,
            ownPosts

        }

        return response
    } catch (error) {
        throw error
    }
}

async function sendShare(userId, itemId) {
    try {
        const user = await User.findById(userId);

        const item = await Publication.findById({ _id: itemId })
        if (item._shared.includes(userId)) {
            throw new Error('You already shared it!')
        }
        user.sharedPosts.push(itemId);
        user.save();

        item._shared.push(userId);
        item.save();

    } catch (error) {
        throw error
    }
}

async function deleteItem(userId, itemId) {
    try {
        const user = await User.findById(userId);

        const index = user.ownPublications.indexOf(itemId);
        if (index !== -1) {
            user.ownPublications.splice(index, 1);
        }

        await user.save();

        await Publication.findByIdAndDelete(itemId);

    } catch (error) {
        throw error
    }
}

module.exports = { create, getAll, getById, getDetails, sendShare, editById, getUserProfile, deleteItem }