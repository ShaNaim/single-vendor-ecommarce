const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const { registerController, loginController, authenticateController } = require("../controller/authController");

router.post("/register", registerController);

router.post("/login", loginController);
router.get("/authenticate", verifyTokenAndAdmin, authenticateController);
module.exports = router;
