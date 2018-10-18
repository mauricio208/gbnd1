var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GbndFbCampaign = new Schema({
    adAccountSelected: String,
    fbPageSelected: String,
    adAccountData:Object,
    fbPageSelected:Object
});

var FacebookDataSchema = new Schema({
    fbAuthToken: String,
    fbUserID: {type: String, unique: true, sparse: true},
    fbScopes : String,
    gbndFbCampaigns: [GbndFbCampaign]
});

module.exports = mongoose.model('FacebookData', FacebookDataSchema );