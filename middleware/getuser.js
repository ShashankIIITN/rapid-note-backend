var jwt = require('jsonwebtoken');
require('dotenv').config();

const Token_Footer = process.env.REACT_APP_WEBTOKEN_FTCODE;

const GetUser = (req, res, next) => {
    const AuthToken = req.header('auth_token');
    if (!AuthToken) {
        res.status(401).send({ error: "Authentication failed : auth-token error 1" });
    }
    try {
        let data = jwt.verify(AuthToken, Token_Footer);
        data = {user: data}
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ msg: "Authentication failed : auth-token error 2", error: error.message });
    }

}

module.exports = GetUser;