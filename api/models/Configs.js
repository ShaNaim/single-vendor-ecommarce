const Config = require("./Config");

module.exports.createConfig = async (config) => {
	console.log("Creating New Config :", config);
	try {
		const newConfig = new Config(config);
		const savedConfig = await newConfig.save();
		if (savedConfig) return savedConfig;
		else throw Error("Failed To create New Config");
	} catch (err) {
		console.log("Create Config :", err);
		throw Error(err);
	}
};

module.exports.updateConfig = async (config) => {
	console.log("Update Config :", config);
	try {
		const updatedConfig = await Config.findByIdAndUpdate(
			config.id,
			{
				$set: config.body,
			},
			{ new: true }
		);

		if (updatedConfig) return updatedConfig;
		else throw Error("Failed To Update Config");
	} catch (err) {
		console.log("Update Config :", err);
		throw Error(err);
	}
};

module.exports.deleteConfig = async (id) => {
	console.log("Delete Config by ID:", id);
	try {
		const deletedConfig = await Config.findByIdAndDelete(id);
		if (deletedConfig) return deletedConfig;
		else throw Error("Failed To Delete Config");
	} catch (err) {
		console.log("Delete Config :", err);
		throw Error(err);
	}
};

module.exports.getbyId = async (id) => {
	console.log("Get Config :", id);
	try {
		const foundConfig = await Config.findById(id);
		if (foundConfig) return foundConfig;
		else throw Error("Failed To Get Config");
	} catch (err) {
		console.log("Create Config :", err);
		throw Error(err);
	}
};

module.exports.getAllConfigs = async () => {
	try {
		const foundConfigs = await Config.find();
		if (foundConfigs) return foundConfigs;
		else throw Error("Failed to Get Configs");
	} catch (error) {
		throw error;
	}
};
