const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const errParser = require('../util/parser');
const { create, getAll, getById, getOwnerItems, deleteItem, editItem } = require('../services/furnitureService');
const { hasUser } = require('../middlewares/guards');

router.get('/catalog', async (req, res) => {

    try {
        let items;
        const params = req.query.where
        if (params) {
            const ownerId = params.split('=')[1];
            items = await getOwnerItems(JSON.parse(ownerId));
        }
        else {
            items = await getAll();
        }
        res.status(200).json(items);

    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

router.post('/catalog', hasUser(),
    body('img').
        isURL({ protocols: 'http' }).
        withMessage('URL is invalid'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.length < 0) {
                throw errors;
            }
            const userId = req.user._id;
            await create(req.body, userId);

            res.status(204).end();
        } catch (error) {
            const message = errParser(error);
            res.status(400).json({ message })
        }
    })

router.get('/catalog/:id', async (req, res) => {
    try {

        const id = req.params.id
        const item = await getById(id);

        res.status(200).json(item);

    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

router.delete('/catalog/:id', hasUser(), async (req, res) => {
    try {
        const id = req.params.id;
        await deleteItem(id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
})

router.put('/catalog/:id', hasUser(),
    body('img').
        isURL({ protocols: 'http' }).
        withMessage('URL is invalid'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.length < 0) {
                throw errors;
            }
            const id = req.params.id;
            await editItem(id, req.body);

            res.status(204).end();
        } catch (error) {
            const message = errParser(error);
            res.status(400).json({ message })
        }
    })

module.exports = router