const Order = require("../models/Order");

function makeid(length) {
	var result = "";
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// CREATE
module.exports.createOrder = async (req, res) => {
	if (req.body) {
		const orderId = makeid(8);
		req.body.orderId = orderId;
		const newOrder = new Order(req.body);
		try {
			const savedOrder = await newOrder.save();
			res.status(200).json(savedOrder);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

//UPDATE
module.exports.updateOrder = async (req, res) => {
	if (req.params.id && req.body) {
		try {
			const updatedOrder = await Order.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedOrder);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

//DELETE
module.exports.deleteOrder = async (req, res) => {
	if (req.params.id) {
		try {
			await Order.findByIdAndDelete(req.params.id);
			res.status(200).json("Order has been deleted...");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

//GET USER ORDERS
module.exports.getOrderById = async (req, res) => {
	if (req.params.id) {
		try {
			const orders = await Order.findById(req.params.id);
			console.log();
			res.status(200).json(orders);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

module.exports.getOrderByUser = async (req, res) => {
	if (req.params.id) {
		try {
			const orders = await Order.find({ userId: req.params.id });
			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

module.exports.getOrderByOrderId = async (req, res) => {
	console.log(req.body);
	if (req.body.orderId && req.body.contact) {
		try {
			const order = await Order.findOne({ orderId: req.body.orderId });
			if (order) {
				if (order.contactNumber == req.body.contact) {
					res.status(200).json(order);
				} else res.status(400).json("Incorrect Contact Number");
			} else res.status(404).json("Order Not Found");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};

// //GET ALL
module.exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
};

// GET MONTHLY INCOME
module.exports.getIncome = async (req, res) => {
	if (req.query.pid) {
		const productId = req.query.pid;
		const date = new Date();
		const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
		const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
		try {
			const income = await Order.aggregate([
				{
					$match: {
						createdAt: { $gte: previousMonth },
						...(productId && {
							products: { $elemMatch: { productId } },
						}),
					},
				},
				{
					$project: {
						month: { $month: "$createdAt" },
						sales: "$amount",
					},
				},
				{
					$group: {
						_id: "$month",
						total: { $sum: "$sales" },
					},
				},
			]);
			res.status(200).json(income);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(400).json("bad request");
	}
};
