const mongoose = require("mongoose");
const { isEmail } = require("validator");

const AddressSchema = new mongoose.Schema({
	address: { type: String, required: true },
	city: { type: String, required: true },
	area: { type: String, required: true },
	zip: { type: Number, required: false },
});

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: [true, "Please Enter an Email"],
			unique: true,
			validate: [isEmail, "Please Enter a Valid Email"],
		},
		password: { type: String, require: [true, "Please Enter a Password"] },
		contact: { type: Number, require: [true, "Please Enter Contact Number"] },
		address: {
			type: AddressSchema,
			require: [true, "Please Enter an Address"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		img: { type: String, default: "Image" },
		firstName: { type: String, default: "Dr. John" },
		lastName: { type: String, default: "Doe" },
		gender: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
