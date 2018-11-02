const express = require('express');
const router = express.Router();
const intdataService = require('../services/intDataService');

router.get('/users', function(req, res, next){
    intdataService.getPagedUsers(req.body.nPerPage, req.body.actualPage).then(data=>{
        res.send(data)
    })
});

module.exports = router;