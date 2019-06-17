let jwt = require('jwt-simple');
let config = require('../config');
let moment = require('moment');
let User = require('../models/users');

let checkAuthentication = (req, res, next) => {
    if(!req.headers.authoritation) {
        return res.status(403).json({
            error: 'Tu petición debe incluir la cabecera de la atenticación'
        })
    }

    let token = req.headers.authoritation;
    let body;

    try {
        body = jwt.decode(token, config.PASSPHRASE);
    } catch {
        return res.status(403).json({ error: 'El token es incorrecto' })
    }

    if(body.expire <= moment().unix()) {
        return res.status(403).json({ error: 'El token ha expirado. Solicita otro'})
    }
    User.findById(body.user, (err, user) => {
        if (err || !User) {
            return res.status(403).json({ error: 'El usuario es incorecto' })
        } else {
            req.user = body.user;
            next();
        }
    })
}

module.exports = {
    checkAuth: checkAuthentication
}