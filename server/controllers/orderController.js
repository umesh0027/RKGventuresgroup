const Order = require("../models/Order");

const Product = require("../models/Product");


// const Order = require("../models/Order");
const User = require("../models/User");

const generateInvoice = require("../utils/generateInvoice");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER (USER)

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, phone } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      phone, // ✅ separate field
      paymentStatus: "Pending",
      orderStatus: "Processing"
    });

    const user = await User.findById(req.user.id);

    const pdfBuffer = await generateInvoice({
      ...order.toObject(),
      user
    });

    await sendEmail(
      user.email,
      "Order Confirmation & Invoice 🧾",
      `Hello ${user.name}, your order has been placed successfully.`,
      pdfBuffer
    );

    res.json({ success: true, order });

  } catch (err) {
    res.status(500).json({ msg: "Order failed" });
  }
};
// USER ORDERS
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};


// ADMIN
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
};



exports.updateOrder = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // ✅ UPDATE STATUS
    order.orderStatus = orderStatus || order.orderStatus;
    await order.save();

    // 🔥 SMART MESSAGE
    let message = "";

    if (orderStatus === "Processing") {
      message = "Your order is being prepared.";
    } else if (orderStatus === "Shipped") {
      message = "Your order has been shipped 🚚";
    } else if (orderStatus === "Delivered") {
      message = "Your order has been delivered ✅";
    }

    // 📧 SEND EMAIL
    await sendEmail(
      order.user.email,
      "Order Status Updated 📦",
      `Hello ${order.user.name}, ${message}`
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};