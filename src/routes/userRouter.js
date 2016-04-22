var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var userRouter = express.Router();
var objectId = require('mongodb').ObjectID;
var passport = require('passport');
var path = require('path');

var router = function(){
    var username = {};
    var orders = [{}];

    var pizza = [{
        name: 'Margretta',
        price: 12,
        active: false

    },
    {
        name: 'Cheese',
        price: 16,
        active: false

    }];

    var sandwitches = [{
        name: 'Batates',
        price: 10,
        active: false

    },
    {
        name: 'Shwrma',
        price: 7,        
        active: false

    }];
    
    var sori = [{
        name: 'Kofta',
        price: 10,
        active: false

    },
    {
        name: 'Tates',
        price: 6,
        active: false

    }];

    // var menu =[pizza,sandwitches,sori];

    var menu = pizza;

    userRouter.route('/')
    .get(function (req,res) {
        res.render('welcome',{title:'Welcome !!'});
    });

    userRouter.route('/Signup')
    .get(function (req,res) {
        res.render('signup',{title: 'Sign Up !!!'});
    });

    userRouter.route('/auth/signup')
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
                res.redirect('/');
            })
        })
        console.log('auth signin');
    })
  });

    userRouter.route('/auth/signin')
    .post(passport.authenticate('local',{
        failureRedirect: '/'
    }), function (req,res) {
        console.log("in sign in ");
        username = req.body;
        res.redirect('/menu');
    });

    userRouter.route('/menu')
    .all(function(req,res,next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    })
    .get(function(req, res) {
        res.sendFile(path.resolve( __dirname + '/../views/userOrder.html'));
    });

    userRouter.route('/api/menu')
    .get(function (req,res) {
        res.json(menu);
    });

    userRouter.route('/api/username')
    .get(function (req,res) {
        console.log('form userrouter ');
        console.log(username);
        res.json(username);
    });
    return userRouter;
}

module.exports = router;