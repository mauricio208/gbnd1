var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GbndFbCampaign = new Schema({
    adAccountSelected: String,
    fbPageSelected: Object,
    adAccountData:Object,
    fbPageData:Object,
    addedOn: String,
});

var FacebookDataSchema = new Schema({
    fbAuthToken: String,
    fbUserID: {type: String, unique: true, sparse: true},
    fbScopes : String,
    gbndFbCampaigns: [GbndFbCampaign]
});

module.exports = mongoose.model('FacebookData', FacebookDataSchema );