const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1/blog';

mongoose.connect(mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});

module.exports = db;