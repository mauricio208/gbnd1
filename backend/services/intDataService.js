const userModel = require('../db/models/user');
const fbDataModel = require('../db/models/facebookData');
const fbs = require('./fbService');
const paging = require('../helpers/dbHelper').paging;


//userModel.aggregate().limit(10).lookup({ from: fbDataModel.collection.collectionName, localField: 'facebookData', foreignField: '_id', as: 'usersfbd' }).unwind('usersfbd').addFields({"usersfbd.gbndFbCampaigns":{adAccountSelected:'$usersfbd.gbndFbCampaigns.adAccountSelected',fbPageSelected:'$usersfbd.gbndFbCampaigns.fbPageSelected'}}).then(b=>console.log(b[0]))

//userModel.collection.countDocuments()

module.exports = {
    getPagedUsers: async function(nPerPage, actualPage){
        let aggregation = userModel.aggregate()
        return await paging(aggregation, nPerPage, actualPage)
        .lookup({ 
            from: fbDataModel.collection.collectionName, 
            localField: 'facebookData',
            foreignField: '_id',
            as: 'facebookData' })
        .unwind('facebookData')
        .addFields({
            "facebookData.gbndFbCampaigns":{
                adAccountSelected:'$facebookData.gbndFbCampaigns.adAccountSelected',
                fbPageSelected:'$facebookData.gbndFbCampaigns.fbPageSelected'
            }
        });
        
    },
}