const express = require('express');
const router = express.Router();
const intdataService = require('../services/intDataService');

router.get('/users', function(req, res, next){
    console.log(req.query);
    intdataService.getPagedUsers(req.query.nPerPage, req.query.actualPage).then(data=>{
        res.send(data)
    })
});

module.exports = router;