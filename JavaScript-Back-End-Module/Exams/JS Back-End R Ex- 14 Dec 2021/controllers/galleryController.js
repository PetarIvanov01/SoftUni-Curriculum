const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { create, editById, getDetails, sendShare, getById, deleteItem } = require('../services/galleryService');
const { parseError } = require('../util/parser')

//Create controllers 
router.get('/create', hasUser, (req, res) => {

    try {
        res.render('create', {
            title: 'Create Page'
        })
    } catch (error) {
        console.error(error);
        throw error
    }

})
router.post('/create', hasUser, async (req, res) => {
    try {
        const { title, technique, picture, certificate } = req.body;
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!');
        }

        const userId = req.user._id;
        await create(userId, { title, technique, picture, certificate })

        res.redirect('/catalog');
    } catch (error) {
        const msg = parseError(error);
        res.render('create', {
            errors: msg,
            body: {
                title: req.body.title,
                technique: req.body.technique,
                picture: req.body.picture,
                certificate: req.body.certificate,
            }
        })
    }

})

//Edit controllers 
router.get('/edit/:id', hasUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const body = await getById(itemId);

        res.render('edit', {
            title: 'Edit Page',
            body
        })

    } catch (error) {
        console.error(error);
        throw error
    }
})
router.post('/edit/:id', hasUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const { title, technique, picture, certificate } = req.body;

        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!');
        }

        await editById(itemId, { title, technique, picture, certificate })

        res.redirect('/gallery/details/' + itemId);

    } catch (error) {
        const msg = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            errors: msg,
            body: {
                title: req.body.title,
                technique: req.body.technique,
                picture: req.body.picture,
                certificate: req.body.certificate,
                _id: req.params.id
            }
        })
    }
})

//Details controller
router.get('/details/:id', hasUser, async (req, res) => {

    try {
        const itemId = req.params.id;
        const isUser = req.user;
        const item = await getDetails(itemId);
        const isOwner = item._author._id == req.user._id;
        const isShared = item._shared.map(v => v.toString()).includes(req.user._id);

        res.render('details', {
            title: 'Details Page',
            item,
            isOwner,
            isUser,
            isShared
        })
    } catch (error) {
        console.error(error);
        throw error
    }
})

//Delete controller
router.get('/delete/:id', hasUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const itemId = req.params.id;

        await deleteItem(userId, itemId);

        res.redirect('/catalog')
    } catch (error) {
        throw error
    }
})

//Share controller
router.get('/share/:id', hasUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user._id;

        await sendShare(userId, itemId);

        res.redirect('/gallery/details/' + itemId);

    } catch (error) {
        console.error(error);
        throw error
    }
})



module.exports = router;