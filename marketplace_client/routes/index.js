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
  var tempItem = {id: 1,
      name: "Macbook Pro 13\"",
      price: 13.5,
      description: "This is a macbook.\n Blah blah blah. \n",
      picture: "images/macbook.jpeg",
      details:
    {cpu_speed: "2.4 GHz",
      cores: "2",
      memory: "4GB",
      hard_drive: "500GB",
      screen_size: "13",
      cd_dvd: "CD + DVD Writer"
    }
  };
  res.render('search/singleItem', {item: tempItem});//?displayItem=1
});

// -------------
// Account pages
router.get('/account', function(req, res) {

  var tempAccount = {id: 1,
    username: "Remmington",
    actualName: "Joan Smourgh",
    address: "52 Arad Road",
    email: "dotdot@hotmail.com",
    number: "027 8888 888",
    profilePic: "images/donald.jpg",
    watchlist:
    [1,4,5,6,3]
  };
  res.render('account/account', {account: tempAccount})
});

router.get('/watchlist', function(req, res) {
  var tempAccount = {id: 1,
    username: "Remmington",
    actualName: "Joan Smourgh",
    address: "52 Arad Road",
    email: "dotdot@hotmail.com",
    number: "027 8888 888",
    profilePic: "image/donald.jpg",
    //profile pic
    watchlist:
        [1,4,5,6,3]
  };

  var tempItem1 = {
    name: "Macbook Pro 13",
    price: 5000,
    picture: "images/macbook.jpeg"
  };

  var tempItem2 = {
    name: "Macbook Pro 14",
    price: 333,
    picture: "images/macbook.jpeg"

  };
  var tempItem3 = {
    name: "Macbook Pro 16",
    price: 13.5,
    picture: "images/macbook.jpeg"

  };
  watchlist = [tempItem1,tempItem2,tempItem3]


  res.render('account/watchlist', {account: tempAccount, watchlist: watchlist})
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
