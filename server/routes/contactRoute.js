// const express = require("express");
// const { sendMessage } = require("../controllers/contactControllers");

// const router = express.Router();

// router.post("/", sendMessage);

// module.exports = router;



const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
  toggleImportant
} = require("../controllers/contactControllers");


const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", sendMessage);

// ADMIN
router.get("/", protect, adminOnly, getMessages);
router.delete("/:id", protect, adminOnly, deleteMessage);
router.put("/:id/important", protect, adminOnly, toggleImportant);

module.exports = router;