const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		require: [true, "Please Provide Necessary Reference"],
	},
	tokenId: { type: String, required: true },
	type: { type: String, required: true },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 900,
	},
});

module.exports = mongoose.model("token", TokenSchema);
