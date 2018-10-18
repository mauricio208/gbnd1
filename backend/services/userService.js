const userModel = require('../db/models/user')
const fbDataModel = require('../db/models/facebookData')

module.exports = {
    initUser: async function(data){
        console.log('DATOS:', data);
        try {
            let fbData = new fbDataModel({
                fbAuthToken: data.userData.fbAuthToken,
                fbUserID: data.userData.fbUserID,
                fbScopes : data.userData.fbScopes,
                gbndFbCampaigns: [{
                    adAccountSelected: data.userData.adaccountSelected,
                    fbPageSelected: data.userData.fbpageSelected
                }] 
            })
            let newFbData = await fbData.save()
            let newUser = new userModel({
                name: data.userData.userName,
                email: data.userData.email,
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
    getUser: function (fbId) {

        
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

