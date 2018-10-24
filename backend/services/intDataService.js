const userModel = require('../db/models/user')
const fbDataModel = require('../db/models/facebookData')
const fbs = require('./fbService');

module.exports = {
    getGbndCampaign: async function(){
        return await fbDataModel.findOne({'fbUserID':fbId})
    },
}