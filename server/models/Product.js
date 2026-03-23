const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  images: [String],
  stock: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);