const cors = require('../middlewares/cors');
const express = require('express');

module.exports = (app) =>  {

    app.use(express.json());
    app.use(cors());

}