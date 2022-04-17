const { ticket } = require("../models/Ticket");
const User = require("../models/User");
const Product = require("../models/Products");
const TICKET_STATUS = {
	pending: 0,
	solved: 1,
};

const formateResponseData = async (list) => {
	let responseList = [];
	if (list.length === 0) return [];

	for await (const element of list) {
		const productInfo = await Product.getbyId(element.productId);

		responseList.push({
			...element._doc,
			productTitle: productInfo ? productInfo.title : "empty",
		});
	}

	return responseList;
};

module.exports.createTicket = async (req, res) => {
	try {
		const { title, description, email, productId } = req.body;
		const newTicket = await ticket.create({
			userId: req.user.id,
			title,
			description,
			messages: [{ sender: email, message: description }],
			email,
			productId,
		});

		if (newTicket) res.status(200).json(newTicket);
		else throw Error("Failed To create New Tickets");
	} catch (error) {
		console.log("Create Tickets :", error);
		res.status(500).json(error);
	}
};

module.exports.getAllTickets = async (req, res) => {
	try {
		const allTicketsList = await ticket.find();
		res.status(200).json(await formateResponseData(allTicketsList));
	} catch (error) {
		console.log("Get Tickets :", error);
		res.status(500).json(error);
	}
};

module.exports.getTicketById = async (req, res) => {
	console.log("getTicketById", req.params.id);
	const id = req.params.id;
	try {
		const ticketData = await ticket.findById(id);
		const productInfo = await Product.getbyId(ticketData.productId);
		console.log({ ...ticketData._doc, productTitle: productInfo.title });
		res.status(200).json({ ...ticketData._doc, productTitle: productInfo.title });
	} catch (error) {
		console.log("Get Tickets :", error);
		res.status(500).json(error);
	}
};

module.exports.getTicketsByCustomer = async (req, res) => {
	const customerId = req.params.id;
	try {
		if (customerId) {
			const allTicketsList = await ticket.find({ userId: customerId });
			res.status(200).json(await formateResponseData(allTicketsList));
		} else res.status(400).json({ status: false, message: "Incorrect Information" });
	} catch (error) {
		console.log("Get Tickets :", error);
		res.status(500).json(error);
	}
};

module.exports.creating = (req, res) => res.status(200).json("UNDER CONSTRUCTION");

module.exports.updateMessage = async (req, res) => {
	const updatedProduct = await ticket.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		{ new: true }
	);
	res.status(200).json(updatedProduct);
};
