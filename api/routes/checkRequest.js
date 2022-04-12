module.exports = checkRequest = (req, res, next) => {
	console.log(
		`LOG :: => ${req.get("origin")}::=>${req.method} => ${
			req.originalUrl
		} :: ${new Date()}`
	);

	// console.log("\u001b[" + 32 + "m" + "hello stack" + "\u001b[0m");
	next();
};
