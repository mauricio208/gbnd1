var FB = require('fb');
var mongoose = require('mongoose');
var fbDataModel = require('../db/models/facebookData')

fb = new FB.Facebook({
    appId      : process.env['APP_ID'],
    status     : true,
    xfbml      : true,
    version    : 'v3.1'
});

module.exports = {

    storeUserData: async function(req){
        var userFbData = new fbDataModel({
            status: req.body.status,
            authResponse: req.body.authResponse
        });

        let adaccounts =  await this.getAdaccounts(req.body.authResponse.userID, req.body.authResponse.accessToken)
        console.log('ADACCOUNTS:',adaccounts)
        return userFbData
    },

    getAdaccounts: async function(userID, accessToken) {
       
        fb.setAccessToken(accessToken);
        let adaccounts = await fb.api(`${userID}/adaccounts`);
        return adaccounts
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

