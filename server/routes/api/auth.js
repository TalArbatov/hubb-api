const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require("mongoose").model("User");
const authController = require('../../controllers/auth');

const secret = config.JWTsecret;

router.get("/test", (req, res, next) => {
  res.send("API response from Express server");
});



// router.post(
//   "/local-signup",
//   passport.authenticate("local-signup", {
//     successRedirect: "/api/auth/local-signup-success",
//     failureRedirect: "/api/auth/local-signup-failure",
//     failureFlash: true
//   })
// );

// router.get("/local-signup-failure", (req, res, next) => {
//   res.status(400).send(req.flash("error")[0]);
// });

// router.get("/local-signup-success", (req, res, next) => {
//   res.send("success!");
// });

router.post(
  "/local-login",
  passport.authenticate("local-login", {
    failureFlash: true,
    failureRedirect: "/api/auth/local-login-failure",
    successRedirect: "/api/auth/local-login-success"
  })
);

router.post('/signup', authController.localSignup)

router.get("/local-login-success", authController.localLoginSuccess)

router.get("/local-login-failure", (req, res) => {
  res.sendStatus(401);
});

router.get("/protected", require("../../middlewares/checkJWT"), (req, res, next) => {
  res.send("success!");
});
router.get("/protected2", passport.authenticate("jwt"), (req, res, next) => {
  res.send("success!2");
});
router.get("/error", (req, res, next) => {
  const error = new Error("user unauthorized");
  setImmediate(() => {
    next(error)
  })
});
// router.get("/facebook", passport.authenticate("facebook"));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: "/api/auth/facebook/failure"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log("user");
//     console.log(req.user);

//     res.redirect("/api/auth/local-login-success");
//   }
// );

// router.get("/facebook/failure", (req, res, next) => {
//   res.sendStatus(401);
// });

router.get("/facebook-token", (req, res) => {
  passport.authenticate("facebook", { session: false }, function(err, user, info) {
    if (err) {
      if (err.oauthError) {
        var oauthError = JSON.parse(err.oauthError.data);
        res.send(oauthError.error.message);
      } else {
        res.send(err);
      }
    } else {
      const newUser = {
        _id: user._id,
        email: user.email
      };
      jwt.sign(newUser, secret, { expiresIn: config.JWTexp }, (err2, token) => {
        if (err2) res.status(501);
        else res.send(token);
      });
    }
  })(req, res);
});

router.get("/google-token", (req, res) => {
  passport.authenticate("google", { session: false }, function(err, user, info) {
    if (err) {
      if (err.oauthError) {
        var oauthError = JSON.parse(err.oauthError.data);
        res.send(oauthError.error.message);
      } else {
        res.send(err);
      }
    } else {
      const newUser = {
        _id: user._id,
        email: user.email
      };
      const secret = config.JWTsecret;
      jwt.sign(newUser, secret, { expiresIn: config.JWTexp }, (err2, token) => {
        if (err2) res.status(501);
        else res.send(token);
      });
    }
  })(req, res);
});

router.get("/me/from/token", (req, res, next) => {
  const tokenHeader = req.headers["x-access-token"] || req.headers["authorization"];
  if (!tokenHeader) return res.sendStatus(401);
  const token = tokenHeader.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      User.findById(decoded._id, (err, user) => {
        if (err) return res.sendStatus(401);

        const cleanUser = {
          _id: user._id
        };
        //sends a new, refreshed token
        jwt.sign(cleanUser, secret, { expiresIn: 60 * 30 }, (err, token) => {
          if (err) return res.sendStatus(401);
          else res.send({ token, user });
        });
      });
    }
  });
});

module.exports = router;
