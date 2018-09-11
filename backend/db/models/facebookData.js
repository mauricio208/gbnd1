var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacebookDataSchema = new Schema({
    status: String,
    authResponse: Object
});

module.exports = mongoose.model('FacebookData', FacebookDataSchema );