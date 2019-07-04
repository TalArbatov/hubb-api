const User = require('mongoose').model('User');
const config = require('../../config');
const GoogleTokenStrategy = require('passport-google-token').Strategy
const {uniqueNamesGenerator} = require('unique-names-generator');
const passport = require('passport')
passport.use('google',new GoogleTokenStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          // if there is no user found with that facebook id, create them
          var newUser = new User();
    
          // set all of the facebook information in our user model
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name  = profile.displayName;
          newUser.username = uniqueNamesGenerator();
          if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
            newUser.email = profile.emails[0].value;
    
          // save our user to the database
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
  }
));