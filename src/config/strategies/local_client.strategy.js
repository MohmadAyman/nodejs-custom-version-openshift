var passport = require('passport');
LocalStrategy = require('passport-local').Strategy,
mongodb = require('mongodb').MongoClient;

// TODO if a user doesn't exist output an error msg and dont procced -dontt chch for the password-.
module.exports = function () {

	console.log('in Client LocalStrategy');

	passport.use(new LocalStrategy({
		name: 'clientName',
		password: 'clientPassword'
	},
	function(clientName,password,done){
		var url = 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
		mongodb.connect(url,function(err,db){
			var collection = db.collection('restaurants');
			collection.findOne({name: clientName},function(err,results,mess){
				console.log(results);
				if(!results)
				{
					done(null, false, {message: 'User does not exist'});
				}
				if(results.password === password){
					var user = results;
					done(null, user,{message: 'ok'});					
				}else{
					done(null, false, {message: 'wrong'});
				}
			}
			);
		})
	})
	)		
};