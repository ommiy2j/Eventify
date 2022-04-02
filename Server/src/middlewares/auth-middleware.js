const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/config.env' });

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    //when no token is available
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
