var mongoose = require('mongoose');
var GbndFbCampaign = require('./gbndFbCampaign')
var Schema = mongoose.Schema;

var FacebookDataSchema = new Schema({
    fbAuthToken: String,
    fbUserID: String,
    fbScopes : String,
    gbndFbCampaign: [GbndFbCampaign]
});

module.exports = mongoose.model('FacebookData', FacebookDataSchema );