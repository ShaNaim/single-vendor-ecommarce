const mongoose = require("mongoose");

const DeliveryTypeSchema = new mongoose.Schema({
	name: { type: String },
	value: { type: Number },
});

const CartConfigSchema = new mongoose.Schema({
	discount: { type: String },
	deliveryType: { type: DeliveryTypeSchema },
});

const ConfigSchema = new mongoose.Schema(
	{
		cartConfig: { type: CartConfigSchema },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Config", ConfigSchema);
