const userModel = require('../db/models/user');
const fbDataModel = require('../db/models/facebookData');
const paging = require('../helpers/dbHelper').paging;

async function getPagedUsers(nPerPage, actualPage){
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
        "facebookData.gbndFbCampaigns":
        {
            _id:1,
            addedOn:1,
            adAccountSelected:1,
            fbPageSelected:1
        }
    });
}

async function getCampaign(cpId){
    return await fbDataModel.find({"gbndFbCampaigns._id":cpId},{"gbndFbCampaigns.$":1})
}

async function getPagedAdAccountData(fbUserID, nPerPage, actualPage) {
    let aggregation = fbDataModel.aggregate().match({fbUserID:fbUserID})
    return await paging(aggregation, nPerPage, actualPage)
}
module.exports = {
    getPagedUsers,
    getCampaign

}