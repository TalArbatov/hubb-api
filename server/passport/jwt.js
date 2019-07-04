const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('User')
passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
        secretOrKey: require('../../config').JWTsecret
      },    
      (payload, done) => {
        try {
          //find the user specified in token
          User.findOne({ _id: payload._id }, (err, user) => {
            if (!user) {
              return done(null, false, {message: 'test'});
            }
            //otherwise, return the user
            else {
              return done(null, user);
            }
          });
        } catch (e) {
          //console.log('inside passport.js jwt-strategy:' + e);
          done(e, false);
        }
      }
    )
  );
  