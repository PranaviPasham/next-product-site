const mongoose = require('mongoose');
const winston = require('winston');


module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/User')
.then(()=> winston.info(`Connected to MongoDB...`));
}
