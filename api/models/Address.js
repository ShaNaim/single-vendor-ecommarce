const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
	address: { type: String, required: true },
	city: { type: String, required: true },
	area: { type: String, required: true },
	zip: { type: Number, required: false },
});

module.exports = mongoose.model("Address", AddressSchema);
