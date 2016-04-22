var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var clientRouter = express.Router();
var objectId = require('mongodb').ObjectID;
var passport = require('passport');
var path = require('path');

var router = function(io){
    io.on('connection', function(socket){
      socket.on('event', function(data){});
      socket.on('disconnect', function(){});
  });

    var pizza = [{
        name: 'Margretta',
        price: 12
    },
    {
        name: 'Margretta',
        price: 16
    }];

    var sandwitches = [{
        name: 'Margretta',
        price: 10
    },
    {
        name: 'Margretta',
        price: 7
    }];
    
    var sori = [{
        name: 'Margretta',
        price: 10
    },
    {
        name: 'Margretta',
        price: 6
    }];

    var orders = [];
    var name = {};
    var menu = [pizza,sandwitches,sori];
    
    clientRouter.route('/')
    .get(function (req,res) {
        res.render('signinClient',{title: 'Sign in to recive More orders!'});
        menu = [pizza,sandwitches,sori];
    });

    clientRouter.post('/auth/signin', 
      passport.authenticate('local', { failureRedirect: '/Client' }),
      function(req, res) {
        if (req.body.id == 95) {
            res.redirect('/Client/orders');
        }
        else{
            res.redirect('/Client');
        }
    });


    clientRouter.route('/signup')
    .get(function (req,res) {
        res.render('signupClient', {title: 'Sign up client'});
    });

    clientRouter.route('/auth/signup')
    .post(function (req,res) {
      console.log(req.body);
      var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
      mongodb.connect(url,function(err,db){
        var collection = db.collection('userphone');
        var user = {
            username: req.body.username,
            password: req.body.password,
            orders: orders 
        };
        collection.insert(user,function (err, results) {
            req.login(results,function () {
                res.redirect('/Client/AddYourMenu');
            })
        })
        console.log('auth signin');
    })
  });

// TODO The menu will be haard codded for now.
clientRouter.route('/AddMenu')
.get(function (req,res) {
    res.render('addMenu',{title: 'Add your menu!'});
    console.log('The menu will be haard codded for now.');
    menu = [pizza,sandwitches,sori];
    console.log(menu);
});

clientRouter.route('/AddYourMenu')
.get(function (req,res) {
    res.sendFile(path.resolve( __dirname + '/../views/AddYourMenu.html'));
});

clientRouter.route('/profile')
.post(function (req,res) {
    res.json(req.user);
});

clientRouter.route('/orders')
.get(function (req,res) {
    res.sendFile(path.resolve( __dirname + '/../views/clientOrder.html'));
});

// TODO the time intervaal at the angular part calls the get for this url regurarly,
// whic eventially overrides the client interface
clientRouter.route('/ordersUpdate')
.post(function (req,res) {
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].active) {
        }
        menu[i]
    }
    var toBeSent = [ name, menu];
    console.log(toBeSent);
//    res.json(toBeSent);
       io.emit('reciveOrder',toBeSent); 
        // If i was to save the i orders in the db, should be done here
        console.log('client sent to interface');
    });        

var sendToInterface = function () {
    console.log('in sendToInterface');
}

clientRouter.route('/api/order/')
.post(function (req,res) {
    console.log('client recived ROUTER!!');
    name = req.body[0];
    menu = req.body[1];
    // res.redirect('/client/ordersUpdate');
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].active) {
        }
        menu[i]
    }
    var toBeSent = [ name, menu];
    console.log(toBeSent);
//    res.json(toBeSent);
       io.emit('reciveOrder',toBeSent); 
});

return clientRouter;
}

module.exports = router;