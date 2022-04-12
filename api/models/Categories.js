const Category = require("./Category");

module.exports.createCategory = async (category) => {
	try {
		const newCategory = new Category(category);
		const savedCategory = await newCategory.save();
		if (savedCategory) return savedCategory;
		else throw Error("Failed To create New Category");
	} catch (err) {
		console.log("Create Category :", err);
		throw Error(err);
	}
};

module.exports.updateCategory = async (id, body) => {
	console.log("Update Category :", id, body);
	try {
		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			{
				$set: body,
			},
			{ new: true }
		);

		if (updatedCategory) return updatedCategory;
		else throw Error("Failed To Update Category");
	} catch (err) {
		console.log("Update Category :", err);
		throw Error(err);
	}
};

module.exports.deleteCategory = async (id) => {
	console.log("Delete Category by ID:", id);
	try {
		const deletedCategory = await Category.findByIdAndDelete(id);
		if (deletedCategory) return deletedCategory;
		else throw Error("Failed To Delete Category");
	} catch (err) {
		console.log("Delete Category :", err);
		throw Error(err);
	}
};

module.exports.getbyId = async (id) => {
	console.log("Get Category :", id);
	try {
		const Category = await Category.findById(id);
		if (Category) return Category;
		else throw Error("Failed To Get Category");
	} catch (err) {
		console.log("Create Category :", err);
		throw Error(err);
	}
};

module.exports.getAllCategories = async () => {
	try {
		const categorys = await Category.find();
		if (categorys) return categorys;
		else throw Error("Failed to Get Categorys");
	} catch (error) {
		console.log("Categorys Error", error);
		throw error;
	}
};
