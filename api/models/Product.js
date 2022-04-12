const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		img: { type: String },
		category: { type: String },
		price: { type: Number, required: true },
		buyingPrice: { type: Number, required: true },
		inStock: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
