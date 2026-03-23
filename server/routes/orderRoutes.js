


const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder
} = require("../controllers/orderController");

// ✅ FIX HERE
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, getAllOrders);
router.put("/:id", protect, updateOrder);

module.exports = router;