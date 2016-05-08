var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/advanced', function(req, res) {
  res.render('advancedSearch')
});

router.get('/account', function(req, res) {
  res.render('account')
});

module.exports = router;
