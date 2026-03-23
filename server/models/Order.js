const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: String,
  phone: String, // ✅ ADD THIS
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: { type: String, default: "Processing" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);