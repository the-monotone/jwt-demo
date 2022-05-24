var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = {};

const SECRET_KEY = 'this_is_secret';
const users = require('../users');

const getUser = (username, password) => {
    console.log(users);
    for (let i = 0; i < users.length; i++) {
        if (users[i][0] == username && users[i][1] == password) {
            const user = {username: users[i][0]}
            return user;
        }
    }
    return null;
}

router.post('/', function(req, res, next) { 
    const { username, password } = req.body;
    if (username && password) {
        console.log(username, password);
        var user = getUser(username, password);
        if (!user) {
            res.status(401).json({ msg: 'No such user found', user });
        } else {
            var payload = { username: user.username };
            var token = jwt.sign(payload, SECRET_KEY);
            res.json({ msg: 'ok', token: token });
        }
    }
});

module.exports = router;