var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var mongoItems;

router.get('/', function(req, res, next) {
  res.render('index');
});

// Connect to the db
mongoClient.connect("mongodb://localhost:27017/test", {strict: true}, function(err, db) {
  if(!err) {
    console.log("connected to mongo");
    mongoItems = db.collection('items');

  } else {
    console.log("failed to connect to mongo");
  }
})


// ------------
// Search pages
router.get('/advanced', function(req, res) {
  res.render('search/advancedSearch')
});

router.get('/browse', function(req, res) {
  mongoItems.find().toArray(function(err, items) {
    if (!err) {
      //console.log(items[0].stock);
      res.render('browse', {stock: items[0].stock}); // returns all items
    }
  });
});

router.get('/singleItem', function(req, res) {
  res.render('search/singleItem?displayItem=1');
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

router.get('/watchlist', function(req, res) {
  res.render('watchlist')
});



module.exports = router;
