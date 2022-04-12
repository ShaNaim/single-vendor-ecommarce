const Topic = require("./Topic");

module.exports.createTopic = async (topic) => {
	console.log("Creating New Topic :", topic);
	try {
		const newTopic = new Topic(topic);
		const savedTopic = await newTopic.save();
		console.log("savedTopic :", savedTopic);
		if (savedTopic) return savedTopic;
		else throw Error("Failed To create New Topic");
	} catch (err) {
		console.log("Create Topic :", err);
		throw Error(err);
	}
};

module.exports.updateTopic = async (topic) => {
	console.log("Update Topic :", topic);
	try {
		const updatedTopic = await Topic.findByIdAndUpdate(
			topic.id,
			{
				$set: topic.body,
			},
			{ new: true }
		);

		if (updatedTopic) return updatedTopic;
		else throw Error("Failed To Update Topic");
	} catch (err) {
		console.log("Update Topic :", err);
		throw Error(err);
	}
};

module.exports.deleteTopic = async (id) => {
	console.log("Delete Topic by ID:", id);
	try {
		const deletedTopic = await Topic.findByIdAndDelete(id);
		if (deletedTopic) return deletedTopic;
		else throw Error("Failed To Delete Topic");
	} catch (err) {
		console.log("Delete Topic :", err);
		throw Error(err);
	}
};

module.exports.getbyId = async (id) => {
	console.log("Get Topic :", id);
	try {
		const topic = await Topic.findById(id);
		if (topic) return topic;
		else throw Error("Failed To Get Topic");
	} catch (err) {
		console.log("Create Topic :", err);
		throw Error(err);
	}
};

module.exports.getAllTopics = async () => {
	try {
		const topics = await Topic.find();
		if (topics) return topics;
		else throw Error("Failed to Get Topics");
	} catch (error) {
		throw error;
	}
};
