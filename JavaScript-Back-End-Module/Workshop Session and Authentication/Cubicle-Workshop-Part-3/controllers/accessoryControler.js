const { createItem, getById, getAccessory, getDocument } = require('../services/requests');

const router = require('express').Router();

//Create Accessory Page
router.get('/', (req, res) => {

    const user = req.user;
    res.render('accessory/createAcc', {
        isUser: user
    });

});

//Create Accessory request
router.post('/create', async (req, res) => {

    const body = req.body;
    const id = await createItem('acc', body);

    res.redirect('/')
})

//Accessory page to attach
router.get('/:id/attach', async (req, res) => {

    const user = req.user;
    const id = req.params.id;
    const cube = await getById(id);
    const accessories = await getAccessory(id, cube);

    res.render('accessory/attach', {
        isUser: user,
        item: cube,
        accessories
    })
})

//Ataching accessory 
router.post('/:id/attach', async (req, res) => {

    const cubeId = req.params.id;
    const cube = await getDocument(cubeId);
    const accessorieId = req.body.accessory

    cube.accessories.push(accessorieId)

    await cube.save();

    res.redirect('/');
})

module.exports = router