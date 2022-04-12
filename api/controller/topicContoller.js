const Topics = require("../models/Topics");

module.exports.createController = async (req, res) => {
	try {
		const topic = req.body;
		if (topic) {
			const savedTopic = await Topics.createTopic(topic);
			if (savedTopic) {
				res.status(200).json(savedTopic);
			} else throw Error("Create Failed");
		} else res.status(400).json("Provide Information");
	} catch (err) {
		console.log("savedTopic Controller Error:", err);
		res.status(500).json(err);
	}
};

//UPDATE
module.exports.updateController = async (req, res) => {
	try {
		const updatedProduct = await Topics.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
};

//DELETE
module.exports.deleteController = async (req, res) => {
	console.log(req.params.id);
	try {
		await Topics.deleteTopic(req.params.id);
		res.status(200).json("Product has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET PRODUCT
module.exports.singleTopicController = async (req, res) => {
	try {
		const product = await Product.getbyId(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET ALL PRODUCTS
module.exports.allTopicController = async (req, res) => {
	try {
		const allTopics = await Topics.getAllTopics();
		if (allTopics) {
			res.status(200).json(allTopics);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
