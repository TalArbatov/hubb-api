const Hub = require("mongoose").model("Hub");
const Post = require('mongoose').model('Post')
const User = require('mongoose').model("User");
const hubAuthentication = require('../../helpers/authHelper').hubAuthentication
const router = require("express").Router();
const passport = require("passport");
const hubController = require('../../controllers/hub')

// GET / gets list of all hubs
// GET /:hub gets single hub by name
// POST / creates a new hub
// PUT / modifies existing hub
// DELETE /:hub deletes existing hub


//GET /:hub/subscribe
// /:hub/unsubscribe

// GET /:hub/posts/ list of all posts
// GET /:hub/posts/:post fetch single post by ID
// POST /:hub/posts/ create a new post
// PUT /:hub/posts/:post modify existing post
// DELETE /:hub/posts/:post delete existing post

//middleware for hubs




// =====
// ROUTES
// =====

// get list of all hubs
router.get("/", hubController.getHubs);


// create a new hub
router.post("/", passport.authenticate("jwt"), hubController.createHub);

// get specific hub by name
router.get("/:hub", passport.authenticate(['jwt', 'anonymous']), hubController.getHub);


// subscribe to hub
router.get('/:hub/subscribe',passport.authenticate('jwt'),  hubController.subscribe)

// unsubsribe to hub
router.get('/:hub/unsubscribe',passport.authenticate('jwt'), hubController.unsubscribe)
module.exports = router;
