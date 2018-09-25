'use strict';

const Product = require('../models/product');

function getProduct (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`});
    if (!product) return res.status(404).send({message: 'The product does not exist'});
    res.status(200).send({ product });
  });
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error making the request: ${err}`});
    if (!products) return res.status(404).send({message: 'There are no products'});

    res.status(200).send({products});
  });
}

function saveProduct (req, res) {
  console.log('POST /api/product');
  console.log(req.body);

  let body = req.body;

  let product = new Product({
    'user': req.user._id,
    'name': body.name,
    'picture': body.picture,
    'price': body.price,
    'category': body.category,
    'description': body.description
  });


  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Failed to save in the database: ${err}`});

    res.status(200).send({ product: productStored });
  });
}

function updateProduct (req, res) {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Error updating the product: ${err}`});

    res.status(200).send({ product: productUpdated });
  });
}

function deleteProduct (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error when deleting the product: ${err}`});
    product.remove(err => {
      if (err) res.status(500).send({message: `Error when deleting the product: ${err}`});
      res.status(200).send({message: 'The product has been eliminated'});
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
};
