'use strict';

const services = require('../services');

// Authentication token
function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Access denied' });
  }

  const token = req.headers.authorization.split(' ')[1];

  services.decodeToken(token)
    .then(response => {
      req.user = response;
      if (!response.type === 'ADMIN_ROLE') {
        return res.status(403).send({ message: 'You do not have administrator permissions' });
      }
      next();
    })
    .catch(response => {
      res.status(response.status);
    });
}

module.exports = isAuth;
