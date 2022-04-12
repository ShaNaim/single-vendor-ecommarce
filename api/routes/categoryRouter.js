const { verifyTokenAndAdmin } = require("./verifyToken");
const { createController, updateController, deleteController, singleCategoryController, allCategoryController } = require("../controller/categoryController");
const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, createController);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateController);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteController);

//GET CATEGORY
router.get("/find/:id", verifyTokenAndAdmin, singleCategoryController);

//GET ALL CATEGORYS
router.get("/", allCategoryController);

module.exports = router;
