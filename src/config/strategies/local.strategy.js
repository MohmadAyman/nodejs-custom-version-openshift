var passport = require('passport');
LocalStrategy = require('passport-local').Strategy,
mongodb = require('mongodb').MongoClient;

// TODO if a user doesn't exist output an error msg and dont procced -dontt chch for the password-.
module.exports = function () {

	console.log('in LocalStrategy');

	passport.use(new LocalStrategy({
		username: 'username',
		password: 'password'
	},
	function(username,password,done){
		var connection_string = '127.0.0.1:27017/mynodeaecookup';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	process.env.OPENSHIFT_APP_NAME;
};
mongodb.connect(connection_string,function(err,db){
	var collection = db.collection('userphone');
	console.log('matched number is : ');
	var x = parseInt(collection.find({username: username}).count());
	console.log(x);
	if (x===8){
		console.log('Right !!');
		done(null, false);
	}
	collection.findOne({username: username},function(err,results,mess){
		console.log(results);
		if (err) { done(err); }
		if (results === 'null') { done(null, false); }
		if(!results.username) { done(null, false); }
		if (!results.username === username) { done(null, false); }				
		if (!results.password === password) { done(null, false); }
		done(null, results);
	}
	);
})
})
	)		
};