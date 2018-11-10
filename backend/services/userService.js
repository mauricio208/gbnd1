const userModel = require('../db/models/user')
const fbDataModel = require('../db/models/facebookData')
const fbs = require('./fbService');
module.exports = {
    initUser: async function(data){
        try {
            let fbData = new fbDataModel({
                fbAuthToken: data.userData.fbAuthToken,
                fbUserID: data.userData.fbUserID,
                fbScopes : data.userData.fbScopes,
                gbndFbCampaigns: [{
                    adAccountSelected: data.userData.adaccountSelected,
                    fbPageSelected: data.userData.fbpageSelected,
                    addedOn: Date.now()
                }] 
            })
            let newFbData = await fbData.save()

            let adData = await fbs.getAdaccountInsights(data.userData.fbUserID,fbData.gbndFbCampaigns[0].id)
            let pageData = await fbs.getPageInsights(data.userData.fbUserID,fbData.gbndFbCampaigns[0].id)

            fbData.gbndFbCampaigns[0].adAccountData = adData;
            fbData.gbndFbCampaigns[0].fbPageData = pageData;
            newFbData.save()

            let newUser = new userModel({
                name: data.userData.userName,
                email: data.userData.email? data.userData.email: data.stripe.email,
                facebookData: newFbData.id,
                stripeData: data.stripe
            });
            return await newUser.save()
        } catch (error) {
            console.log(error)
            console.error(error)
            return error;
        }
    },
    getUser: async function (fbId) {
        return await userModel.findOne({'facebookData.fbUserID':fbId})
    },
    getAllUsers: function(){

    },

    chargeUser: async function(stripeCustomerId, amount, description){
        const charge = await stripe.charges.create({
          amount: 1000,
          currency: 'usd',
          description:description,
          customer: stripeCustomerId,
        });
    }
    
}
    // Create a Customer:
    
    // // Charge the Customer instead of the card:
    // const charge = await stripe.charges.create({
    //   amount: 1000,
    //   currency: 'usd',
    //   customer: customer.id,
    // });
  
    // YOUR CODE: Save the customer ID and other info in a database for later.  

