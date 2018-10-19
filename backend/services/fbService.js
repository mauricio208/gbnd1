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
    let results = responseObject.data;
    while (responseObject.paging.next){
        response = await got(responseObject.paging.next, {json:true});
        responseObject = response.body;  
        results = results.concat(responseObject.data);
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
        console.log('ADACCOUNTS:',adaccounts)
        return userFbData
    },

    getAdaccountInsights: async function(fbUserID, gbndCampaignId, fields) {
        let fbData = await fbDataModel.findOne({fbUserID:fbUserID});
        console.log('selected', fbData)
        let campaign = fbData.gbndFbCampaigns.id(gbndCampaignId)
        
        fb.setAccessToken(fbData.fbAuthToken);
        let adaccountsInsights = await fb.api(`${campaign.adAccountSelected}/insights`,{fields:"clicks,frequency,inline_post_engagement"});
        
        return fbGetAllPages(adaccountsInsights)
    },

    getPageInsights: async function(fbUserID, gbndCampaignId, metrics) {
        let fbData = await fbDataModel.findOne({fbUserID:fbUserID});
        console.log('selected', fbData)
        let campaign = fbData.gbndFbCampaigns.id(gbndCampaignId)
        fb.setAccessToken(campaign.fbPageSelected.access_token);
        
        let options = {
            date_preset:"this_year",
            // period:"month",
            // metric:`page_actions_post_reactions_like_total,
            // page_actions_post_reactions_love_total,
            // page_actions_post_reactions_wow_total,
            // page_actions_post_reactions_haha_total,
            // page_actions_post_reactions_sorry_total,
            // page_actions_post_reactions_anger_total,
            // page_actions_post_reactions_total`
            metric:"page_fans"
        }
        let pageInsights = await fb.api(`${campaign.fbPageSelected.id}/insights`,options);
        return fbGetAllPages(pageInsights)
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

