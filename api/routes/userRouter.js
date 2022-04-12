const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const {
	updateByIdController,
	deleteController,
	findByIdController,
	findAllController,
	statusController,
} = require("../controller/userController");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateByIdController);
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteController);
//GET USER
router.get("/find/:id", verifyTokenAndAdmin, findByIdController);
//GET ALL USER
router.get("/", verifyTokenAndAdmin, findAllController);
//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, statusController);

module.exports = router;

// if (req.body.password) {
//   req.body.password = CryptoJS.AES.encrypt(
//     req.body.password,
//     process.env.PASS_SEC
//   ).toString();
// }
