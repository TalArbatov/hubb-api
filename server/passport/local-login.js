const passport = require('passport');
const config = require('../../config');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}, (err, doc) => {
        if(err) return done(null, false, {message: 'Internal Error in Database'})
        if(!doc) return done(null, false, {message: 'Username does not exist'})

        doc.comparePassword(password, (err, isMatch) => {
            if(err) return done(null, false, {message: 'Error while comparing passwords'})
            if(!isMatch) return done(null, false, {message: 'Password is not correct'})
            return done(null, doc, {message: 'success!'})
        })
    })
}))