var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GbndFbCampaign = new Schema({
    adAccount: String,
    fbPageSelected: String,
});

module.exports = mongoose.model('FacebookData', FacebookDataSchema );