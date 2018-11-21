const express = require('express');
const router = express.Router();
const intdataService = require('../services/intDataService');

router.get('/users', async function(req, res, next){
    users = await intdataService.getPagedUsers(req.query.nPerPage, req.query.actualPage)
    res.send(users)
    
});

router.get('/campaign', async function(req, res, next){
    cpData = await intdataService.getCampaign(req.query.cpId)
    res.send(cpData)

});


module.exports = router;