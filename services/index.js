'use strict';

const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');

// Create token
function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
}

// Decode token
function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'The token has expired'
        });
      }
      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken
};
