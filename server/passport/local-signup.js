const User = require("mongoose").model("User");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err, false, {messagee: 'Error inside database.'});
        if (user) {
          return done(null, false, {message: 'Email already in use.'});
        } else {
          const newUser = new User({
            email,
            password
          });

          // save the user
          newUser.save((err, doc) => {
            if (err) done(null, false, {message: 'Error while saving user'})
            return done(null, doc);
          });
        }
      });
    }
  )
);

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
