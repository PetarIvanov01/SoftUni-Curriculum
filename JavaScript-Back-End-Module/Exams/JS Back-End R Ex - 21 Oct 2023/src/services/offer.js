const Electronic = require("../models/Electronics")

const create = async ({ name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price
}, owner) => {
    try {
        const electronic = new Electronic({
            name,
            type,
            damages,
            image,
            description,
            production: Number(production),
            exploitation: Number(exploitation),
            price: Number(price),
            owner,
        });

        await electronic.save();

        return electronic;
    } catch (error) {
        throw error;
    }
}

const getCatalog = async () => {
    try {
        return await Electronic.find({}).lean();

    } catch (error) {
        throw error
    }
}

const getOfferById = async (offerId) => {
    try {

        return await Electronic.findById(offerId).lean();
    } catch (error) {
        throw error
    }
}

const buyOffer = async (offerId, userId) => {
    try {

        const offer = await Electronic.findById(offerId);

        offer.buyingList.push(userId);

        await offer.save();

    } catch (error) {
        throw error
    }


}

const editOffer = async (offerId, updatedOffer) => {

    try {
        const oldOffer = await Electronic.findById(offerId);

        if (!oldOffer) {

            throw new Error('Offer not found');
        }
        oldOffer.name = updatedOffer.name;
        oldOffer.type = updatedOffer.type;
        oldOffer.damages = updatedOffer.damages;
        oldOffer.image = updatedOffer.image;
        oldOffer.description = updatedOffer.description;
        oldOffer.production = Number(updatedOffer.production);
        oldOffer.exploitation = Number(updatedOffer.exploitation);
        oldOffer.price = Number(updatedOffer.price);

        await oldOffer.save();
    } catch (error) {
        throw error;
    }
}

const deleteOffer = async (offerId) => {

    try {
        await Electronic.findByIdAndDelete(offerId);
    } catch (error) {
        throw error
    }
}

const searchOffers = async (searchQueries) => {

    try {
        const queryObject = {}

        for (const key in searchQueries) {
            const queryRegex = new RegExp(searchQueries[key], 'i');
            queryObject[key] = queryRegex
        }

        const offers = await Electronic.find(queryObject).lean();

        return offers
    } catch (error) {
        throw error
    }
}
module.exports = { create, getCatalog, getOfferById, buyOffer, editOffer, deleteOffer, searchOffers }