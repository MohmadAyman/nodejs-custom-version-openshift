var express = require('express');
var app = express();


var joinRouter = express.Router();

var items = [
    {
        title: 'pizza',
        price: '19'
    },
    {
        title: 'HotDog',
        price: '12'
    }
];

var router = function(){
    joinRouter.route('/')
    .get(function (req,res) {
        
        res.render('join',{title: 'Avilable res, Join them Now!',
            items: items
                          });
    });

    joinRouter.route('/signup')
    .get(function (req,res) {
        res.render('join',{title: 'hello from ejs'});
    });
}
module.exports = joinRouter;