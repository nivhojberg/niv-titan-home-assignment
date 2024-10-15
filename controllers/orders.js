const mongoose = require('mongoose');

const Order = mongoose.model('Order');

const createOrder = async (req, res) => {
  const createdOrder = await Order.create(req.body);

  res.send({createdOrder});
};

getOrdersByUser = async (req, res) => {
  const user = req.query.user

  if (!user) {
    res.send("Invalid user");
  }

  const dbOrders = await Order.find({ user });
  res.send(dbOrders);
};

module.exports = { createOrder, getOrdersByUser };
