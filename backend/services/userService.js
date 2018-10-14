var userModel = require('../db/models/user')
var fbDataModel = require('../db/models/facebookData')
var gbndFbCModel = require('../db/models/gbndFbCampaign')

module.exports = {
    initUser: async function(data){
        var UserSchema = new Schema({
            name: String,
            email: String,
            password: String,
            facebook_data: { type: Schema.Types.ObjectId, ref: 'FacebookData' },
            stripeData: Object
        });

        // var userStripe = new fbDataModel({
        //     names: req.body.status,
        //     email:,
        //     authResponse: req.body.authResponse
        // });
        return userFbData.save()


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

