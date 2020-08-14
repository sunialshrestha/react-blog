const { User } = require('../models/user');
const { JsonWebTokenError } = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    // check for token
    if(!token) {
        return    res.status(401).json({ msg: 'No token, authorization denied'});
    }

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error:true})
        req.token = token;
        req.user = user;
        next();
    })
   
}

module.exports = { auth };