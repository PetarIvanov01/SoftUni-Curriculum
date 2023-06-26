const cors = require('../middlewares/cors');
const express = require('express');
const trimBody = require('../middlewares/trim');
const session = require('../middlewares/session');

module.exports = (app) =>  {

    app.use(cors());
    app.use(express.json());
    app.use(trimBody());
    app.use(session());

}