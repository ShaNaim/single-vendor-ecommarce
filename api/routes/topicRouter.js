const { verifyTokenAndAdmin } = require("./verifyToken");
const {
	createController,
	updateController,
	deleteController,
	singleTopicController,
	allTopicController,
} = require("../controller/topicContoller");
const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, createController);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateController);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteController);

//GET PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, singleTopicController);

//GET ALL PRODUCTS
router.get("/", allTopicController);

module.exports = router;
