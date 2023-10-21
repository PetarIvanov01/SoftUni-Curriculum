const catalogController = require("../controllers/catalog");
const homeController = require("../controllers/home");
const loginController = require("../controllers/auth/login");
const registerController = require("../controllers/auth/register");
const logoutController = require("../controllers/auth/logout");
const searchController = require("../controllers/offer/search");
const detailsController = require("../controllers/offer/details");
const createController = require("../controllers/offer/crud/create");
const editController = require("../controllers/offer/crud/edit");
const deleteController = require("../controllers/offer/crud/delete");
const buyController = require("../controllers/offer/buy");
const errorHandler = require("../controllers/404");

const homeAndCatalogControllers = [homeController, catalogController]
const authControllers = [loginController, registerController, logoutController];
const offerControllers = [searchController, detailsController, createController, editController, deleteController, buyController];

module.exports = (app) => {

    app.use('/', homeAndCatalogControllers);
    app.use('/auth', authControllers);
    app.use('/offer', offerControllers);

    app.get('*', errorHandler);

} 