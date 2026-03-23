const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const generateInvoice = require("../utils/generateInvoice");
const sendEmail = require("../utils/sendEmail");

exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    res.status(500).json({ msg: "Razorpay error", err });
  }
};





exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");


      if (expectedSign === razorpay_signature) {

  const Order = require("../models/Order");
  const Product = require("../models/Product");
  const User = require("../models/User");

  const items = [];

  for (let i of orderData.items) {
    const p = await Product.findById(i.product);

    items.push({
      product: p._id,
      name: p.name,
      price: p.price,
      qty: i.qty
    });
  }

  // ✅ CREATE ORDER
  const newOrder = await Order.create({
    user: req.user.id,
    items,
    totalAmount: orderData.totalAmount,
    shippingAddress: orderData.shippingAddress,
    paymentStatus: "Paid",
    orderStatus: "Processing"
  });

  // 🔥 GET USER
  const user = await User.findById(req.user.id);

  // 📄 GENERATE PDF
  const pdfBuffer = await generateInvoice({
    ...newOrder.toObject(),
    user
  });

  // 📧 SEND EMAIL
  await sendEmail(
    user.email,
    "Your Order Invoice 🧾",
    "Thank you for your purchase!",
    pdfBuffer
  );

  return res.json({
    success: true,
    order: newOrder
  });
}

  
     else {
      return res.status(400).json({ success: false });
    }

  } catch (err) {
    res.status(500).json(err);
  }
};