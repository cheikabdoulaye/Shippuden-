const axios = require('axios');

module.exports.config = {
 name: "miko",
 version: "1.0.0",
 role: 0,
 aliases: ["miko"],
 credits: "cliff",
cooldown: 0,
hasPrefix: false,
	usage: "",
};

module.exports.run = async function ({ api, event, args }) {
 const content = encodeURIComponent(args.join(" "));

 if (!content) {
	return api.sendMessage("🟢 C'est moi le dieu ototsuki qui ne craint rien ni personne. j'écoute ✊😤✊?", event.threadID, event.messageID);
 }

 api.sendMessage("🟡 une minable question je ne réponds pas.. un de mes subordonnées arrive pour te répondre. un instant s'il te plaît 🌑", event.threadID, event.messageID); 

 const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

 try {
	const response = await axios.get(apiUrl);
	const reply = response.data.reply;

	api.sendMessage(reply, event.threadID, event.messageID);
 } catch (error) {
	console.error("Error fetching data:", error.message);
	api.sendMessage("An error occurred while processing your request.", event.threadID);
 }
};
