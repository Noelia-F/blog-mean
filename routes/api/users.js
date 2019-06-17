const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let User = require('../../models/users');
let jwt = require('jwt-simple');
let moment = require('moment');
const config = require('../../config');

router.post('/signup', async (req, res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        User.create(req.body, (err, user) => {
            if(err) return res.status(500).json({error: err});
            res.json(user);
        })
    } catch (err) {
        if(err) return res.status(500).json({ error: err});
    }
});

router.post('/login', (req, res) => {
    User.findOne({ userName: req.body.userName }, async (err, user) => {
        if(err || !user) {
            res.status(500).json({error: 'Nombre de usuario y/o contraseña erroneos'});
        } else {
            let passwordEquals = await bcrypt.compare(req.body.password, user.password);
            if(passwordEquals) {
                res.json({token: createToken(user)})
            } else {
                res.status(500).json({ error: 'Nombre de usuario y/o contraseña erroneos'})
            }
        }
    })
});

let createToken = (pUser) => {
    let body = {
        user: pUser._id,
        create: moment().unix(),
        expire: moment().add(5, 'h').unix()
    }
    return jwt.encode(body, config.PASSPHRASE);
}

module.exports = router;