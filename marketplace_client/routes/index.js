var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var mongoItems;

// Connect to the db
mongoClient.connect("mongodb://localhost:27017/test", {strict: true}, function(err, db) {
  if(!err) {
    console.log("connected to mongo");
    mongoItems = db.collection('items');
    mongoUsers = db.collection('users');

  } else {
    console.log("failed to connect to mongo");
  }
})

router.get('/', function(req, res, next) {
  //var featuredItems = [];
  mongoItems.find().toArray(function(err, items) {
    var featuredItems = [];
    for(var i=0;i<4;i++){
      var item = items[0].stock[i];
      featuredItems.push(item);
      if (item.images == undefined){
          item.images = ["images/noimages.jpg"];
      }
    }
    res.render('index', {items: featuredItems});
  });
  //res.render('index', {items: featuredItems});
});

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
    else {
      res.render('error', {message: "failed to get items from the database", error: err});
    }
  });
});
/*
router.get('/singleItem', function(req, res) {
  mongoItems.find().toArray(function(err, items) {
    if(!err) {
      console.log("IMAGES: " + items[0].stock[0].images);
      res.render('search/singleItem', {item: items[0].stock[0]}); // TODO: get correct item specified by id
    }
    else {
      res.render('error', {message: "failed to get item id: " + 0, error: err});
    }
  });
});*/

router.get('/singleItem', function(req, res) {
  mongoItems.find().toArray(function(err, items) {
    if(!err) {
      var id = parseInt(req.query.id)-1;
      console.log("ID: " + id);
      console.log("IMAGES: " + items[0].stock[id]);
      if (items[0].stock[id] == undefined){
        items[0].stock[id].images = ["images/noimages.jpg"];
      }
      var id = parseInt(req.query.id)-1;
      console.log("ID: " + id);
      console.log("IMAGES: " + items[0].stock[id]);
      //console.log("OBJECT: " + items[0]);
      res.render('search/singleItem', {item: items[0].stock[id]}); // TODO: get correct item specified by id
    }
    else {
      res.render('error', {message: "failed to get item id: " + 0, error: err});
    }
  });
});

// -------------
// Account pages
router.get('/account', function(req, res) {

  mongoUsers.find().toArray(function(err, users) {
    if(!err) {
      res.render('account/account', {account: users[0].user[0]});
    }
    else {
      res.render('error', {message: "failed to get user id: " + 0, error: err});
    }
  });
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
  var watchToDisplay = [];

    mongoItems.find().toArray(function(err, items) {
      for(var i = 0; i < tempAccount.watchlist.length; i++) {

        for (var j = 0; j < items[0].stock.length; j++) {
          var item = items[0].stock[j]; // TODO: get correct item specified by id
          if (item.id == tempAccount.watchlist[i]) {
            if (item.images == undefined){
              item.images = ["images/noimages.jpg"];
            }
            watchToDisplay.push(item);
          }
        }
      }

      res.render('account/watchlist', {account: tempAccount, watchlist: watchToDisplay});

    });



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
