const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const messageController = require("../controller/messageController");
const router = require("express").Router();

//CREATE
router.post("/", verifyToken, messageController.createTicket);

//UPDATE
router.put("/:id", verifyToken, messageController.updateMessage);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, messageController.creating);

//GET MESSAGES
router.get("/find/:id", verifyToken, messageController.getTicketsByCustomer);

//GET ALL MESSAGEES
router.get("/", verifyTokenAndAdmin, messageController.getAllTickets);

router.get("/:id", verifyToken, messageController.getTicketById);

module.exports = router;
