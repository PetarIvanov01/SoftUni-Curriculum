const router = require('express').Router();
const { create, editById, sendShare, getById, deleteItem } = require('../services/galleryService');
const { parseError } = require('../util/parser')

//Create controllers 
router.get('/create', (req, res) => {

    try {
        res.render('create', {
            title: 'Create Page'
        })
    } catch (error) {
        const msg = parseError(error);
        res.render('home', {
            title: 'Home Page',
            errors: msg,
        })
    }

})
router.post('/create', async (req, res) => {
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
router.get('/edit/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const body = await getById(itemId);

        res.render('edit', {
            title: 'Edit Page',
            body
        })

    } catch (error) {
        const msg = parseError(error);
        res.render('home', {
            title: 'Home Page',
            errors: msg,
        })
    }
})
router.post('/edit/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { title, technique, picture, certificate } = req.body;

        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All fields are required!');
        }

        await editById(itemId, { title, technique, picture, certificate })

        res.redirect('/details/' + itemId);

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

//Delete controller
router.get('/delete/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const itemId = req.params.id;

        await deleteItem(userId, itemId);

        res.redirect('/catalog')
    } catch (error) {
        const msg = parseError(error);
        res.render('home', {
            title: 'Home Page',
            errors: msg,
        })
    }
})

//Share controller
router.get('/share/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user._id;

        await sendShare(userId, itemId);

        res.redirect('/details/' + itemId);

    } catch (error) {
        const msg = parseError(error);
        res.render('home', {
            title: 'Home Page',
            errors: msg,
        })
    }
})



module.exports = router;