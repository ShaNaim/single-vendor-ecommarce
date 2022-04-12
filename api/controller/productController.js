const Product = require("../models/Products");
//CREATE
module.exports.createController = async (req, res) => {
	try {
		const product = req.body;
		if (product) {
			const savedProduct = await Product.createProduct(product);
			res.status(200).json(savedProduct);
		} else throw Error("Create Failed");
	} catch (error) {
		console.log("In Product Contorller :createController:", error);
		res.status(500).json(error);
	}
};

//UPDATE
module.exports.updateController = async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (error) {
		console.log("In Product Contorller :updateController:", error);
		res.status(500).json(error);
	}
};

//DELETE
module.exports.deleteController = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Product has been deleted...");
	} catch (error) {
		console.log("In Product Contorller :deleteController:", error);
		res.status(500).json(error);
	}
};

//GET PRODUCT
module.exports.singleProductController = async (req, res) => {
	try {
		const product = await Product.getbyId(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		console.log("In Product Contorller :singleProductController:", error);
		res.status(500).json(error);
	}
};

//GET ALL PRODUCTS
module.exports.allProductsController = async (req, res) => {
	try {
		const qNew = req.query.new;
		const qCategory = req.query.category;
		const limit = req.query.limit;
		let products;
		if (qNew) {
			products = await Product.getLatestProducts(limit);
		} else if (qCategory) {
			console.log(qCategory);
			products = await Product.getProductByCategory(qCategory.toLowerCase());
			console.log(products);
		} else {
			products = await Product.getAllProducts();
		}
		res.status(200).json(products);
	} catch (error) {
		console.log("In Product Contorller :allProductsController:", error);
		res.status(500).json(error);
	}
};
