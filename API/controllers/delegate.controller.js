const { Order } = require("../models/order.js");
const { Admin } = require("../models/auth.js");
const { Delegate } = require("../models/delegate.js");

const delegateOrder = async (req, res) => {
  const { orderId, delegateId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const delegate = await Admin.findById(delegateId);
    if (!delegate) {
      return res.status(404).json({ message: "Delegate not found" });
    }
    const existingDelegate = await Delegate.findOne({ orderId });
    if (existingDelegate) {
      return res
        .status(400)
        .json({ message: "Order already assigned to a delegate" });
    }
    const newDelegate = new Delegate({
      orderId,
      delegateId,
    });
    await newDelegate.save();

    order.orderStatus = "Processing";
    await order.save();

    res.status(201).json(newDelegate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error occurred." });
  }
};

const getDelegateOrders = async (req, res) => {
  try {
    const delegateId = req.user.id;
    const orders = await Delegate.find({ delegateId }).populate("orderId");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

module.exports = { delegateOrder, getDelegateOrders };
