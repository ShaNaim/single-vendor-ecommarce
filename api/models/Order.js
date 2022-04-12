const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
	address: { type: String, required: true },
	city: { type: String, required: true },
	area: { type: String, required: false },
	zip: { type: Number, required: false },
});

const OrderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
		orderId: { type: String },
		amount: { type: Number, required: true },
		deliveryCost: { type: Number, required: true },
		address: { type: AddressSchema, required: true },
		billingAddress: { type: AddressSchema, required: false },
		status: { type: String, default: "pending" },
		contactNumber: { type: Number },
		paymentMethod: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
