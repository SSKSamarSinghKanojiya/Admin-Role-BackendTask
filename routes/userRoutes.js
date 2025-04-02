const express = require("express");
const authenticateJWT = require("../middlewares/authMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, authorizeRoles("admin"), getAllUsers);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteUser);

module.exports = router;
