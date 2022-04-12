const User = require("../models/User");

function readyData(user) {
	const { password, ...others } = user._doc;
	return others;
}

//UPDATE User
module.exports.updateByIdController = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		if (updatedUser) res.status(200).json(readyData(updatedUser));
		else throw error("User Update Failed");
	} catch (err) {
		res.status(500).json(err);
	}
};
// Delete User
module.exports.deleteController = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "User has been deleted...", action: true });
	} catch (err) {
		res.status(500).json({ error: err, action: false });
	}
};

//GET USER
module.exports.findByIdController = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(readyData(user));
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET ALL USER
module.exports.findAllController = async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET USER STATS
module.exports.statusController = async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

	try {
		const data = await User.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
};
