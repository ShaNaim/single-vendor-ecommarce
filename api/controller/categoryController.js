const Categories = require("../models/Categories");

module.exports.createController = async (req, res) => {
	try {
		console.log(req.body);
		const category = req.body;
		if (category) {
			const updatedCategory = await Categories.createCategory(category);
			if (updatedCategory) {
				res.status(200).json(updatedCategory);
			} else throw Error("Create Failed");
		} else res.status(400).json("Provide Information");
	} catch (err) {
		console.log("savedCategory Controller Error:", err);
		res.status(500).json(err);
	}
};

//UPDATE
module.exports.updateController = async (req, res) => {
	try {
		const id = req.params.id;
		const category = req.body;
		if (id && category) {
			const updatedCategory = await Categories.updateCategory(id, category);
			if (updatedCategory) {
				res.status(200).json(updatedCategory);
			} else throw Error("Create Failed");
		} else res.status(400).json("Provide Information");
	} catch (err) {
		console.log("updatedCategory Controller Error:", err);
		res.status(500).json(err);
	}
};

//DELETE
module.exports.deleteController = async (req, res) => {
	console.log(req.params.id);
	try {
		await Categories.deleteCategory(req.params.id);
		res.status(200).json("Product has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET PRODUCT
module.exports.singleCategoryController = async (req, res) => {
	try {
		const product = await Product.getbyId(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET ALL PRODUCTS
module.exports.allCategoryController = async (req, res) => {
	try {
		const allCategories = await Categories.getAllCategories();
		if (allCategories) {
			res.status(200).json(allCategories);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
