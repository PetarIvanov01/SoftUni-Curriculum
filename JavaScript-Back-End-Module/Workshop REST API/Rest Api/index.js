const express = require('express');
const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const itemController = require('./controllers/itemController');

start();
async function start() {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use('/users', authController)
    app.use('/data', itemController)


    app.listen(3030, () => console.log('Server is runnning on port 3030'));
}