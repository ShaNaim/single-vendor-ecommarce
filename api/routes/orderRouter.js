const Order = require("../models/Order");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	isGuest,
} = require("./verifyToken");

const {
	createOrder,
	updateOrder,
	deleteOrder,
	getOrderByUser,
	getOrderById,
	getAllOrders,
	getIncome,
	getOrderByOrderId,
} = require("../controller/orderController");

const router = require("express").Router();

// [domain]/api/orders
//CREATE
router.post("/", isGuest, createOrder);
//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);
//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
//GET USER ORDERS
router.post("/find", getOrderByOrderId);
router.get("/find/:id", verifyTokenAndAuthorization, getOrderByUser);
//GET BY ID
router.get("/:id", verifyTokenAndAdmin, getOrderById);
//GET ALL
router.get("/", verifyTokenAndAdmin, getAllOrders);
// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;
