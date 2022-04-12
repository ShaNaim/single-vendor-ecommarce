const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const {
	registerController,
	loginController,
	authenticateController,
	resetPassword,
	resetPasswordRequest,
} = require("../controller/authController");

router.post("/register", registerController);
router.post("/forgot-password", resetPasswordRequest);
router.post("/reset-password", resetPassword);
router.post("/login", loginController);
router.get("/authenticate", verifyTokenAndAdmin, authenticateController);
module.exports = router;
