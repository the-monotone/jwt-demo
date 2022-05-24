var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success!');
  });

module.exports = router;
