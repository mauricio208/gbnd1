const got  = require('got');
const FB = require('fb');
const fbDataModel = require('../db/models/facebookData')
const userModel = require('../db/models/user')

fb = new FB.Facebook({
    appId      : process.env['APP_ID'],
    status     : true,
    xfbml      : true,
    version    : 'v3.1'
});

async function fbGetAllPages(responseObject){
    let results = responseObject.data[0];
    while (responseObject.paging.next){
        response = await got(responseObject.paging.next, {json:true});
        responseObject = response.body;  
        results.values = results.values.concat(responseObject.data[0].values);
    }
    return results;
}

module.exports = {

    storeUserData: async function(req){
        let userFbData = new fbDataModel({
            status: req.body.status,
            authResponse: req.body.authResponse
        });

        let adaccounts =  await this.getAdaccounts(req.body.authResponse.userID, req.body.authResponse.accessToken)
        return userFbData
    },

    getAdaccountInsights: async function(fbUserID, gbndCampaignId, fields) {
        let fbData = await fbDataModel.findOne({fbUserID:fbUserID});
        let campaign = fbData.gbndFbCampaigns.id(gbndCampaignId)
        
        fb.setAccessToken(fbData.fbAuthToken);
        let adaccountsInsights = await fb.api(`${campaign.adAccountSelected}/insights`,{date_preset:"this_year",fields:"cost_per_action_type,actions,frequency,impressions,reach"});
        
        return fbGetAllPages(adaccountsInsights)
    },

    getPageInsights: async function(fbUserID, gbndCampaignId, metrics) {
        let fbData = await fbDataModel.findOne({fbUserID:fbUserID});
        let campaign = fbData.gbndFbCampaigns.id(gbndCampaignId)
        fb.setAccessToken(campaign.fbPageSelected.access_token);
        let endpoint = `${campaign.fbPageSelected.id}/insights`; 
        
        let pageFans = await fb.api(endpoint, {
            date_preset:"this_year",
            period:"lifetime",
            metric:"page_fans"
        });
        pageFans = await fbGetAllPages(pageFans)
 
        let pageViews= await fb.api(endpoint, { 
            date_preset: 'this_year',
            period: 'week',
            metric: 'page_views_total'
        });
        pageViews = await fbGetAllPages(pageViews)

        return {pageFans: pageFans, pageViews: pageViews}
    },

    getCampaings: function (adaccountId){
        fb.api(`/act_${adaccountId}/campaigns`,
            {
                "effective_status": "[\"ACTIVE\",\"PAUSED\"]",
                "fields": "name,objective"
            },
            function (response) {
              if (response && !response.error) {
                /* handle the result */
              }
            }
        );
    }
    
}

