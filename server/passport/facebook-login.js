const facebook = require('passport-facebook-token');
const passport = require('passport');
const config = require("../../config");
const User = require('mongoose').model('User')
const {uniqueNamesGenerator} = require('unique-names-generator');


passport.use('facebook', new facebook({
    clientID:config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: '/api/auth/facebook/callback'
}, (token, refreshToken, profile, done) => {
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();
    
          // set all of the facebook information in our user model
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name  = profile.displayName;
          newUser.username = uniqueNamesGenerator();
          if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
            newUser.facebook.email = profile.emails[0].value;
    
          // save our user to the database
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
}))
