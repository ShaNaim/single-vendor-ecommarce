const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "seller" },
		title: { type: String },
		messages: [
			{
				sender: {
					type: String,
				},
				message: {
					type: String,
				},
			},
		],
		description: { type: String },
		email: { type: String },
		status: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const ticket = mongoose.model("ticket", ticketSchema);
module.exports = { ticket, ticketSchema };
