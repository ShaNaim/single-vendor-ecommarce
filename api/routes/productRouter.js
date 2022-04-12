const Product = require("../models/Product");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");
const {
	createController,
	updateController,
	deleteController,
	singleProductController,
	allProductsController,
} = require("../controller/productController");
const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, createController);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateController);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteController);

//GET PRODUCT
router.get("/find/:id", singleProductController);

//GET ALL PRODUCTS
router.get("/", allProductsController);

module.exports = router;
