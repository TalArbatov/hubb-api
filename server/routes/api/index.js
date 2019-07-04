const router = require('express').Router({mergeParams: true});

router.use('/auth', require('./auth'));
router.use('/h', require('./hub'));
router.use('/upload', require('./upload'))
router.use('/h/:hub/p', require('./post'))


module.exports = router;