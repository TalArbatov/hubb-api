const passport =  require('passport');

const applyMiddleware = app => {
  return app.use(passport.initialize())
  .use(passport.session())
}

module.exports = applyMiddleware