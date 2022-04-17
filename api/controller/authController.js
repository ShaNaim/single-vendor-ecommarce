const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/email/sendEmail");
const Token = require("../models/Token");
const { randomBytes } = require("crypto");

const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
/// Validate Erros
function errorHandler(err) {
	try {
		console.log(err);
		let errors = { email: "", password: "", contact: "" };
		// Duplicate error
		if (err.code === 11000) {
			if (err.keyValue.email) errors.email = "Email Already Exists , Please enter another Email";
			if (err.keyValue.contact) errors.contact = "This Number is already Registered , Please try another Number";
			return errors;
		}
		//Incorrect Email
		if (err.message === "incorrect Email") {
			errors.email = "Email Address Dosen't Exists";
		}

		//Incorrect Password
		if (err.message === "incorrect Password") {
			errors.password = "Incorrect Password , Please try Again";
		}

		// Validation error
		if (err.message.includes("person validation failed")) {
			Object.values(err.errors).forEach(({ properties }) => {
				errors[properties.path] = properties.message;
			});
			return errors;
		}
		if (err.message.includes("User validation failed")) {
			Object.values(err.errors).forEach(({ properties }) => {
				errors[properties.path] = properties.message;
			});
			return errors;
		}
		return errors;
	} catch (error) {
		console.log("VALIDATROR:CATCH:", error);
	}
}
// JwtToken
async function responseData(user, userPassword) {
	const hashedPassword = await CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
	const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

	if (OriginalPassword == userPassword) {
		const accessToken = await jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);
		const { password, ...others } = user._doc;
		return { ...others, accessToken };
	} else {
		console.log("FAILED //////////////");
		throw "Incorrect Password ";
	}
}
//REGISTER
module.exports.registerController = async (req, res) => {
	console.log(req.body);
	try {
		const newUser = await User.create({
			username: req.body.email,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
			contact: req.body.contact,
			address: req.body.address,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			gender: req.body.gender,
		});
		try {
			// const savedUser = await newUser.save();
			if (newUser) res.status(201).json(await responseData(newUser, req.body.password));
			else throw error("Registrarion Failed");
		} catch (err) {
			console.error(err);
			res.status(500).json(err);
		}
	} catch (error) {
		const errors = errorHandler(error);
		console.error(errors);
		res.status(500).json(errors);
	}
};

//LOGIN
module.exports.loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		if (email && password) {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				res.status(200).json(await responseData(user, password));
			} else {
				res.status(401).json("Incorrect Email Address");
			}
		} else {
			res.status(401).json("Provide credentials!");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports.resetPasswordRequest = async (req, res) => {
	try {
		if (req.body.email) {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				let token = await Token.findOne({ userId: user._id });
				if (token) await token.deleteOne();

				let resetToken = randomBytes(32).toString("hex");
				const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

				await new Token({
					userId: user._id,
					tokenId: hash,
					type: "password-reset",
					createdAt: Date.now(),
				}).save();

				const link = `${clientURL}/reset-password?token=${resetToken}&id=${user._id}`;

				const result = await sendEmail(
					user.email,
					"Password Reset Request",
					{
						name: user.firstName,
						link: link,
					},
					"./template/requestResetPassword.handlebars"
				);
				console.log("RESULT", result);
				if (result === true) {
					res.status(200).json({
						success: true,
						link: link,
					});
				} else {
					throw Error("Email Not Sent");
				}
			} else res.status(404).json({ success: false, message: " User Dosen't Exists " });
		} else {
			res.status(403).json({ success: false, message: " Bad Request " });
		}
	} catch (error) {
		console.log("SEND EMAIL FAILURE :", error);
		res.status(500).json({ success: false });
	}
};

module.exports.resetPassword = async (req, res) => {
	try {
		const { userId, tokenId, password, email } = req.body;
		console.log("183", { userId, tokenId, password, email });
		if (userId && tokenId && password && email) {
			const user = await User.findOne({ email });
			if (user && user.email == email) {
				let passwordResetToken = await Token.findOne({ userId });
				if (!passwordResetToken) {
					throw new Error("Invalid or expired password reset token");
				}
				const isValid = await bcrypt.compare(tokenId, passwordResetToken.tokenId);
				if (!isValid) {
					throw new Error("Invalid or expired password reset token");
				}
				const hash = await CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

				await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });
				const user = await User.findById({ _id: userId });
				const result = await sendEmail(
					user.email,
					"Password Reset Successfully",
					{
						name: user.firstName,
					},
					"./template/resetPassword.handlebars"
				);
				console.log(result);
				await passwordResetToken.deleteOne();
				res.status(200).json({ success: true, result, message: " Password Reset " });
			} else res.status(404).json({ success: false, message: " User Dosen't Exists " });
		} else {
			res.status(403).json({ success: false, message: " Bad Request " });
		}
	} catch (error) {
		console.log("SEND EMAIL FAILURE :", error);
		res.status(500).json({ success: false });
	}
};

module.exports.authenticateController = (req, res) => {
	if (req.body.user) {
		if (req.body.user.isAdmin === true) {
			res.status(200).json(req.body.user.isAdmin);
		} else {
			res.status(403).json(false);
		}
	} else {
		res.status(403).json(false);
	}
};
