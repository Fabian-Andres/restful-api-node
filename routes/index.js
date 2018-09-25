'use strict';

const express = require('express');
const productCtrl = require('../controllers/product');
const orderCtrl = require('../controllers/order');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

// Product routes
api.route('/products')
  .get(auth, productCtrl.getProducts)
  .post(auth, productCtrl.saveProduct);

api.route('/products/:productId')
  .get(auth, productCtrl.getProduct)
  .put(auth, productCtrl.updateProduct)
  .delete(auth, productCtrl.deleteProduct);

// Product routes
api.route('/orders')
  .get(auth, orderCtrl.getOrders)
  .post(auth, orderCtrl.saveOrder);

api.route('/orders/:orderId')
  .get(auth, orderCtrl.getOrder)
  .delete(auth, orderCtrl.deleteOrder);

// User routes
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);

module.exports = api;
