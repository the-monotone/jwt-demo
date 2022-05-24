var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'this_is_secret';

const users = require('./users');

var jwtStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var checked = true;
  users.forEach(user => {
    if (user[0] === jwt_payload.username) {
      checked = false;
      next(null, user);
    }
  })
  if (checked) next(null, false);
});

module.exports = jwtStrategy;