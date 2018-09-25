
'use strict';

const Order = require('../models/order');
const Product = require('../models/product');

function getOrder (req, res) {
  let orderId = req.params.orderId;

  Order.findById(orderId, (err, order) => {
    if (err) return res.status(500).send({message: 'Error making the request: ${err}'});
    if (!order) return res.status(404).send({message: 'The order does not exist'});
    res.status(200).send({ order });
  });
}

function getOrders (req, res) {
  Order.find({}, (err, orders) => {
    if (err) return res.status(500).send({message: 'Error making the request: ${err}'});
    if (!orders) return res.status(404).send({message: 'There are no orders'});

    res.status(200).send({orders});
  });
}

async function saveOrder (req, res) {
  console.log('POST /api/order');
  console.log(req.body);

  let body = req.body;

  const { products } = body;
  // get the items
  let items = await Promise.all(products.map(async data => {
    const product = await Product.findById(data.id);
    return {
      name: product.name,
      price: product.price,
      qty: data.qty,
      product: data.id
    };
  }));

  // Total order
  const total = items.reduce((a, b) => (a.price * a.qty) + (b.price * b.qty));

  let order = new Order({
    name: body.name,
    status: body.status,
    total: total,
    items
  });

  order.save((err, orderStored) => {
    if (err) res.status(500).send({message: 'Failed to save in the database: ${err}'});

    res.status(200).send({ order: orderStored });
  });
}


function deleteOrder (req, res) {
  let orderId = req.params.orderId;

  Order.findById(orderId, (err, order) => {
    if (err) res.status(500).send({message: 'Error when deleting the order: ${err}'});
    order.remove(err => {
      if (err) res.status(500).send({message: 'Error when deleting the order: ${err}'});
      res.status(200).send({message: 'The order has been eliminated'});
    });
  });
}

module.exports = {
  getOrder,
  getOrders,
  saveOrder,
  deleteOrder
};
