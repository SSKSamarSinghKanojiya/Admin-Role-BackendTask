const { query } = require("express-validator");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

const createOrder = async (req, res) => {
  const { items, status } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      items,
      status,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    const query = {};

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      total: totalOrders,
      page,
      totalpages: Math.ceil(totalOrders / limit),
      orders
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updateOrderData = {
      items: req.body.items || order.items,
      status: req.body.status || order.status,
    };

    order = await Order.findByIdAndUpdate(id, updateOrderData, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await Order.findOneAndDelete(id);
    res.status(200).json({ message: "Delete data" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
