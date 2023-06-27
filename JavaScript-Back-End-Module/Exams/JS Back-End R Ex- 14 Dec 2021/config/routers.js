const galleryController = require("../controllers/galleryController");

module.exports = (app) => {

    app.use('/', galleryController);

}