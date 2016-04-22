var passport = require('passport');

module.exports = function (app) {
	// body...
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user,done) {
		done(null, user);		// body...
	});
	passport.deserializeUser(function(user,done) {
		done(null, user);		// body...
	});
	require('./strategies/local.strategy.js')();
};