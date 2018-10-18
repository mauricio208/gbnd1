const FB = require('fb');
const fbDataModel = require('../db/models/facebookData')
const userModel = require('../db/models/user')

fb = new FB.Facebook({
    appId      : process.env['APP_ID'],
    status     : true,
    xfbml      : true,
    version    : 'v3.1'
});

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
        return adaccountsInsights
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

