const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const stripeService = require('../services/stripeService');
const fbService = require('../services/fbService');

router.post('/init', function(req, res, next) {
  // console.log('test:', req);
  console.log('body:', req.body,'\n\n')
  let data = req.body
  stripeService.createStripeCustomer(data.stripeToken.id, data.stripeToken.email, "Growthbond first time customer").then(customer=>{
    res.status(201).json({message:"Stripe data added"});
    userService.initUser({userData:req.body.userData, stripe:customer});
  }).catch(error=>{
    res.status(500).json({error:error});
    console.error(error)
  });
});

router.get('/adaccount/insights', function(req, res, next){
  fbService.getAdaccountInsights('10214261926481249','5bc80eadf459724e0755fa8c').then(result=>{
    // console.log(result)
    res.send(result)
  })
});

router.get('/page/insights', function(req, res, next){
  fbService.getPageInsights('10214261926481249','5bc9514eb47f4770c97734f3').then(result=>{
    // console.log(result)
    res.send(result)
  })
});

module.exports = router;
