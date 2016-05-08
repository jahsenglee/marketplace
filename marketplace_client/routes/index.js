var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

// ------------
// Search pages
router.get('/advanced', function(req, res) {
  res.render('search/advancedSearch')
});

router.get('/singleItem', function(req, res) {
  res.render('search/singleItem?displayItem=1')
});

// -------------
// Account pages
router.get('/account', function(req, res) {
  res.render('account/account')
});

router.get('/login', function(req, res) {
  res.render('account/login')
});

router.get('/upload', function(req, res) {
  res.render('account/upload')
});

module.exports = router;
