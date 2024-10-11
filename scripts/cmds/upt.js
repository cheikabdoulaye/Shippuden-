module.exports = {
  config: {
    name: "upt",
    aliases: ["up"],
    version: "1.0",
    author: "Shibai Otsutsuki",
    role: 2,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
const days = 
Math.floor(uptime / (3600 * 24));
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${days} : ${hours} : ${minutes} : ${seconds}`;
      
      api.sendMessage(`[⌛] ça fait au moins :\n\n✪➩ ${uptimeString} que je veille sur ces moutons\n
Les créatures inférieures que je sauve jour et nuit 🌃 dans ce groupe sont au nombre de :\n\n✪➩ ${allUsers.length}\n
🍀Le nombre de  groupes de moutons 🐑 que je garde 🍀:\n\n✪➩ ${allThreads.length} groupes`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
