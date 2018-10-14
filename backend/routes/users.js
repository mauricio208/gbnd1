var express = require('express');
var router = express.Router();
var fbDataModel = require('../db/models/facebookData')
var fbService = require('../services/fbService')


/* GET users listing. */
router.post('/store-facebook-data', function(req, res, next) {
  // promise = fbService.storeUserData(req)
  // promise.then(model=>model.save(function (err) {
  //   if (err) return res.status(500).send(err);
  //   res.status(201).json({message:"Facebook's user data saved"})
  // }));
});

router.get('/adaccounts', function(req, res, next){
  
});

module.exports = router;
