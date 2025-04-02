const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  registerValidationRules,
  loginValidationRules,
} = require("../utils/validation");

const router = express.Router();

router.post("/register", registerValidationRules(), registerUser);

router.post("/login", loginValidationRules(), loginUser);

module.exports = router;
