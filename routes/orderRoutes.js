const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const authenticateJWT = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", authenticateJWT, authorizeRoles("user"), createOrder);
router.get("/", authenticateJWT, authorizeRoles("admin"), getOrders);
router.put("/:id", authenticateJWT, authorizeRoles("admin"), updateOrder);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteOrder);

module.exports = router;
