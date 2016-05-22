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
  res.render('index');
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

router.get('/singleItem', function(req, res) {
  mongoItems.find().toArray(function(err, items) {
    if(!err) {
      res.render('search/singleItem', {item: items[0].stock[0]}); // TODO: get correct item specified by id
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
        //console.log("I: " + i);
        for (var j = 0; j < items[0].stock.length; j++) {
          var item = items[0].stock[j]; // TODO: get correct item specified by id
          //console.log("ITEM: " + items[0].stock[j].name);
          if (item.id == tempAccount.watchlist[i]) {
           // console.log("ADD to WATCH: " + item.id);
            if (item.images == undefined){
              item.images = ["images/noimages.jpg"];
            }
            watchToDisplay.push(item);
          }
        }
      }

      console.log("Niggers " + tempAccount);
      res.render('account/watchlist', {account: tempAccount, watchlist: watchToDisplay});

    });

  console.log("WATCHTODISPLAY: " + watchToDisplay);
  //res.render('account/watchlist', {account: tempAccount, watchlist: watchToDisplay});
  //var tempItem1 = {
  //  name: "Macbook Pro 13",
  //  price: 5000,
  //  images: ["images/macbook.jpeg","images/macbook2.jpg","images/macbook3.jpg"],
  //};
  //
  //var tempItem2 = {
  //  name: "Macbook Pro 14",
  //  price: 333,
  //  images: ["images/macbook3.jpg","images/macbook.jpeg","images/macbook2.jpg","images/macbook.jpeg"],
  //
  //};
  //var tempItem3 = {
  //  name: "Macbook Pro 16",
  //  price: 13.5,
  //  images: ["images/macbook2.jpg","images/macbook.jpeg","images/macbook3.jpg"],
  //
  //};


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
