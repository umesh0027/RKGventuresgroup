const express = require("express");

const {protect,adminOnly }= require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
    getAllProducts
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.post("/", protect,adminOnly, upload.array("images"), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/category/:categoryId", getProductsByCategory);

module.exports = router;
