const Config = require("../models/Configs");

module.exports.createController = async (req, res) => {
	console.log(req.params.id, req.body);
	try {
		const config = req.body;
		if (config) {
			const savedConfig = await Config.createConfig(config);
			if (savedConfig) {
				res.status(200).json(savedConfig);
			} else throw Error("Create Failed");
		} else res.status(400).json("Provide Information");
	} catch (err) {
		console.log("savedConfig Controller Error:", err);
		res.status(500).json(err);
	}
};

//UPDATE
module.exports.updateController = async (req, res) => {
	console.log(req.params.id, req.body);
	// try {
	// 	const updatedConfig = await Config.updateConfig();
	// 	res.status(200).json(updatedConfig);
	// } catch (err) {
	// 	res.status(500).json(err);
	// }
	res.status(200).json("updatedConfig Recived");
};

//DELETE
module.exports.deleteController = async (req, res) => {
	console.log(req.params.id, req.body);
	try {
		await Config.deleteConfig(req.params.id);
		res.status(200).json("Config has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET Config
module.exports.singleConfigController = async (req, res) => {
	console.log(req.params.id, req.body);
	try {
		const getConfig = await Config.getbyId(req.params.id);
		if (getConfig) res.status(200).json(getConfig);
		else throw Error("Failed");
	} catch (err) {
		res.status(500).json(err);
	}
};

//GET ALL ConfigS
module.exports.allConfigController = async (req, res) => {
	console.log(req.params.id, req.body);
	try {
		const allConfig = await Config.getAllConfigs();
		if (allConfig) {
			res.status(200).json(allConfig);
		} else throw Error("Failed");
	} catch (err) {
		res.status(500).json(err);
	}
};
