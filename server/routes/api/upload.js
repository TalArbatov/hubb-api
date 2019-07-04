const router = require('express').Router();
const uploadController = require('../../controllers/upload');



router.get('/', (req,res,next) => {
    res.send('upload')
})

module.exports = router;

