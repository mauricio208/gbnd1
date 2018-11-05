const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const authService = require('../services/authService');

router.post('/create-user', function(req, res, next) {
  let data = req.body
  let verf = await authService.userVerify(data.jwt);
});


module.exports = router;
