const { getAll, getDetails, getUserProfile } = require('../services/galleryService');
const { hasUser } = require('../middlewares/guards')

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        const items = await getAll();

        res.render('home', {
            title: 'Home Page',
            items,

        })

    } catch (error) {
        console.error(error);
        throw error
    }
})

router.get('/catalog', async (req, res) => {

    try {
        const items = await getAll();

        res.render('catalog', {
            title: 'Catalog Page',
            items
        })

    } catch (error) {
        console.error(error);
    }
})

router.get('/profile', hasUser, async (req, res) => {

    try {
        const userId = req.user._id;
        const userData = await getUserProfile(userId);

        res.render('profile', {
            title: 'Profile Page',
            user: {
                username: userData.username,
                address: userData.address,
                ownPosts: userData.ownPosts,
                sharedPosts: userData.sharedPosts
            }
        })
    } catch (error) {
        console.error(error);
    }
})

//Details controller
router.get('/details/:id', async (req, res) => {

    try {
        const itemId = req.params.id;
        const isUser = req.user;

        let isOwner;
        let isShared;

        const item = await getDetails(itemId);

        if (isUser) {
            isOwner = item._author._id == req.user._id;
            isShared = item._shared.map(v => v.toString()).includes(req.user._id);
        }

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



module.exports = router;