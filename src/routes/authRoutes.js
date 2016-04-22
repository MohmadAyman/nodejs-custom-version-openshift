var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var authRouter = express.Router();
var objectId = require('mongodb').ObjectID;

var router = function(){

    authRouter.route('signup')
    .post(function (req,res) {
        console.log(req.body);
    })
    
    authRouter.route('/')
    .get(function (req,res) {

    })
    return authRouter;
}

module.exports = router;