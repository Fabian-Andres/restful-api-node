'use strict';

const services = require('../services');
var _ = require('lodash');

// Authentication admin
function isAdmin (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  services.decodeToken(token)
    .then(response => {
      let user = response;
      let type = _.get(user, '[0].type');

      // check if the user data have admin role
      if (type === 'ADMIN_ROLE') {
        next();
      } else {
        return res.status(403).send({ message: 'You do not have administrator permissions' });
      }
    });

}

module.exports = isAdmin;
