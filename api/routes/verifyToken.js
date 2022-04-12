const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) {
				req.user = null;
				res.status(403).json("Token is not valid!");
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		console.log("17 :: Unauthenticated Request");
		res.status(401).json("You are not authenticated!");
	}
};

const isGuest = (req, res, next) => {
	console.log(req.body.userId);
	if (req.body.userId) {
		const user = User.findById(req.body.userId);
		if (user) next();
		else res.status(403).json("You are not alowed to do that!");
	} else res.status(403).json("You are not alowed to do that!");
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			console.log("25 :");
			res.status(403).json("You are not alowed to do that!");
		}
	});
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user && req.user.isAdmin) {
			next();
		} else {
			console.log("36 :");
			res.status(403).json("You are not alowed to do that!");
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	isGuest,
};
