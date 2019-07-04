const jwt = require('jsonwebtoken')
const secret = require('../../config').JWTsecret;

const checkJWT = (req,res,next) => {
    const bearerToken = req.headers['authorization'];
    if(!bearerToken) res.sendStatus(403);
    else {
        const token = bearerToken.split(' ')[1];
        jwt.verify(token, secret, {}, (err, decoded) => {
            if(err) res.sendStatus(403)
            else {
                req.user = decoded;
                next();
            }
        })
    }
}

module.exports = checkJWT