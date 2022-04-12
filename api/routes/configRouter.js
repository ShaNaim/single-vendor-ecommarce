const { verifyTokenAndAdmin } = require("./verifyToken");
const {
	createController,
	updateController,
	deleteController,
	singleConfigController,
	allConfigController,
} = require("../controller/ConfigController");
const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, createController);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateController);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteController);

//GET PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, singleConfigController);

//GET ALL PRODUCTS
router.get("/", allConfigController);

module.exports = router;
