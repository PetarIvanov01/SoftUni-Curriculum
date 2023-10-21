const mongoose = require('mongoose');

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
module.exports = async (app) => {

    try {
        mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}