var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'nobetci') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

module.exports = router;
