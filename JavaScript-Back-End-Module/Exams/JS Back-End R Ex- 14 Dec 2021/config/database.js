const { connect } = require('mongoose');

const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/ArtGallery';

module.exports = async (app) => {
    try {
        connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');

    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}