var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var orderRouter = express.Router();
var objectId = require('mongodb').ObjectID;

var router = function(){

    orderRouter.route('/:id')
    .get(function (req,res) {
        var id = new objectId(req.params.id);
        console.log(id);
        var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
        mongodb.connect(url,function(err,db){
         var collection = db.collection('restaurants');
         collection.findOne({_id: id}),
         function(err, results){    
            res.render('order',{title: 'Order!!',
                items: results.menu
            });
            console.log(results);
            db.close();
        };

    });
    })

    orderRouter.route('/')
    .get(function (req,res) {
        var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
        mongodb.connect(url,function(err,db){
         var collection = db.collection('restaurants');
         collection.find({}).toArray(
            function(err, results){    
                res.render('restaurants',{
                    title: 'Which reasuturant would you Order from!',
                    items: results
                })
                db.close();
            });
     });
    })
    return orderRouter;
}

module.exports = router;