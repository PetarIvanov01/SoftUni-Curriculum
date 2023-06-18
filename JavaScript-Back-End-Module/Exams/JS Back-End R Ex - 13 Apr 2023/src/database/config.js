const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/gamingTeam';

async function database() {

   await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('The database is connected');
}
module.exports = database