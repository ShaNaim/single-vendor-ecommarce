const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		name: { type: String, unique: false, required: true },
		image: { type: String },
		show: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
