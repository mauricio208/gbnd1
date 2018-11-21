var stripe = require("stripe")(process.env['STRIPE_SECRET_KEY'])
const userModel = require('../db/models/user')

module.exports = {
    createStripeCustomer: async function(clientToken, email, description){
        const customer = await stripe.customers.create({
            source: clientToken,
            email: email,
            description: description
        });
        return customer;
    },

    // chargeUser: async function(stripeCustomerId, amount, description){
    //     const charge = await stripe.charges.create({
    //       amount: 1000,
    //       currency: 'usd',
    //       description:description,
    //       customer: stripeCustomerId,
    //     });
    // }
    
}
    // Create a Customer:
    
    // // Charge the Customer instead of the card:
    // const charge = await stripe.charges.create({
    //   amount: 1000,
    //   currency: 'usd',
    //   customer: customer.id,
    // });
  
    // YOUR CODE: Save the customer ID and other info in a database for later.  