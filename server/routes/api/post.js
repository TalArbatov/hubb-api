const router = require('express').Router({mergeParams: true});
const postController = require('../../controllers/post');
const passport = require('passport');

router.get('/', postController.getPosts);

router.get('/:postID', postController.getPost)

router.post('/', passport.authenticate('jwt'), postController.submitPost)
module.exports = router;

