module.exports = {
	config: {
			name: "salut",
			version: "1.0",
			author: "aziz",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "salut") return message.reply("salut.. je suis l'intelligence artificielle de boulsa. mon lycée a pour proviseur 🥀SAÏDOU YAMEOGO🥀 n/INFOS 🫱🍀kelem🍀 et 💨DAMI 💨");
}
};
