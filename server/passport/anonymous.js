const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous').Strategy;

passport.use(new AnonymousStrategy())