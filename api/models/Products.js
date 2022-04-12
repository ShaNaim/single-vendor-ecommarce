const Product = require("./Product");
const Category = require("./Category");

module.exports.createProduct = async (product) => {
	try {
		const newProduct = new Product(product);
		const savedProduct = await newProduct.save();
		if (savedProduct) return savedProduct;
		else throw Error("Failed To create New Product");
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};

module.exports.updateProduct = async (product) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			product.id,
			{
				$set: product.body,
			},
			{ new: true }
		);
		if (updatedProduct) return updatedProduct;
		else throw Error("Failed To Update Product");
	} catch (err) {
		console.log("Update Product :", err);
		throw Error(err);
	}
};

module.exports.getbyId = async (id) => {
	console.log("Get Product :", id);
	try {
		const product = await Product.findById(id);
		if (product) return product;
		else throw Error("Failed To Get Product");
	} catch (err) {
		console.log("Create Product :", err);
		throw Error(err);
	}
};
module.exports.deleteProduct = async (id) => {
	console.log("Delete Product :", product);
	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (deletedProduct) return deletedProduct;
		else throw Error("Failed To Delete Product");
	} catch (err) {
		console.log("Delete Product :", err);
		throw Error(err);
	}
};

module.exports.getAllProducts = async () => {
	try {
		const products = await Product.find();
		if (products) return products;
		else throw Error("Failed to Add product");
	} catch (error) {
		throw error;
	}
};

module.exports.getProductByCategory = async (category) => {
	try {
		const products = await Product.find({
			category: {
				$in: [category],
			},
		});
		if (products) {
			return products;
		} else throw Error("Failed To Get Product");
	} catch (err) {
		console.log("Get Product :", err);
		throw Error(err);
	}
};

module.exports.getLatestProducts = async (limit) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 }).limit(limit);
		if (products) return products;
		else throw Error("Failed To Get Product");
	} catch (err) {
		console.log("Get Product :", err);
		throw Error(err);
	}
};
