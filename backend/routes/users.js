var express = require('express');
var router = express.Router();
var fbDataModel = require('../db/models/facebookData')


/* GET users listing. */
router.post('/store-facebook-data', function(req, res, next) {
  console.log('STORING DATA')

  console.log(req)
  var userFbData = new fbDataModel({
      status: req.body.status,
      authResponse: req.body.authResponse
  });
  userFbData.save(function (err) {
    if (err) return res.status(500).send(err);
    res.status(201).json({message:"Facebook's user data saved"})
  });
  
});

module.exports = router;
