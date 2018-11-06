const userModel = require('../db/models/user');
const fbDataModel = require('../db/models/facebookData');
const paging = require('../helpers/dbHelper').paging;


//userModel.aggregate().limit(10).lookup({ from: fbDataModel.collection.collectionName, localField: 'facebookData', foreignField: '_id', as: 'usersfbd' }).unwind('usersfbd').addFields({"usersfbd.gbndFbCampaigns":{adAccountSelected:'$usersfbd.gbndFbCampaigns.adAccountSelected',fbPageSelected:'$usersfbd.gbndFbCampaigns.fbPageSelected'}}).then(b=>console.log(b[0]))

//userModel.collection.countDocuments()

module.exports = {
    getPagedUsers: async function(nPerPage, actualPage){
        let aggregation = userModel.aggregate()
        return await paging(aggregation, Number(nPerPage), Number(actualPage))
        .lookup({ 
            from: fbDataModel.collection.collectionName, 
            localField: 'facebookData',
            foreignField: '_id',
            as: 'facebookData' })
        .unwind('facebookData')
        .project({
            "name":1,
            "email":1,
            "facebookData.fbUserID":1,
            "facebookData.gbndFbCampaigns":{
                adAccountSelected:'$facebookData.gbndFbCampaigns.adAccountSelected',
                fbPageSelected:'$facebookData.gbndFbCampaigns.fbPageSelected'
            }
        });
    },
    getPagedAdAccountData: async function (fbUserID, nPerPage, actualPage) {
        let aggregation = fbDataModel.aggregate().match({fbUserID:fbUserID})
        return await paging(aggregation, nPerPage, actualPage)
    }
}