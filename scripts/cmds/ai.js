const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = ` 𝑺𝒂𝒍𝒖𝒕😉 𝒎𝒐𝒊 c'𝒆𝒔𝒕 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕🤖🤖 𝒖𝒏𝒆 𝑰𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆 𝑨𝒓𝒕𝒊𝒇𝒊𝒄𝒊𝒆𝒍𝒍𝒆👩‍💻 𝒄𝒓𝒆́𝒆𝒓 𝒑𝒂𝒓 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝒎𝒐𝒏 𝒎𝒂𝒊𝒕𝒓𝒆 𝒄𝒐𝒎𝒎𝒆𝒏𝒕 𝒑𝒖𝒊𝒔-𝒋𝒆 𝒗𝒐𝒖𝒔 𝒂𝒊𝒅𝒆𝒓 𝒂𝒖𝒋𝒐𝒖𝒓𝒅'𝒉𝒖𝒊..?`;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'ai',
 author: 'Cheik Amir',
 role: 0,
 aliase: ["ai"],
 category: 'ai-chat',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage("𝑺𝒂𝒍𝒖𝒕😉 𝒎𝒐𝒊 𝒄'𝒆𝒔𝒕 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕🤖🤖 𝒖𝒏𝒆 𝑰𝒏𝒕𝒆𝒍𝒍𝒊𝒈𝒆𝒏𝒄𝒆 𝑨𝒓𝒕𝒊𝒇𝒊𝒄𝒊𝒆𝒍𝒍𝒆👩‍💻 𝒄𝒓𝒆́𝒆𝒓 𝒑𝒂𝒓 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑮𝒖𝒊𝒂𝒕𝒊𝒏 𝒎𝒐𝒏 𝒎𝒂𝒊̂𝒕𝒓𝒆 𝒄𝒐𝒎𝒎𝒆𝒏𝒕 𝒑𝒖𝒊𝒔-𝒋𝒆 𝒗𝒐𝒖𝒔 𝒂𝒊𝒅𝒆𝒓 𝒂𝒖𝒋𝒐𝒖𝒓𝒅'𝒉𝒖𝒊 ?...😁", event.threadID, event.messageID);
 return;
 }

 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
 api.sendMessage(`👨‍💻 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕 👨‍💻 \n➖➖➖➖➖➖➖➖🔍✍️\n${response}\n➖➖➖➖➖➖➖➖🔍✍️𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕`, event.threadID, messageID);
 });
 },
 onChat: async function ({ api, event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("ai")) {
 const input = messageContent.replace(/^ai\s*/, "").trim();
 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
 message.reply(`➖➖➖➖➖➖➖➖🔍✍️👨‍💻 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕👨‍💻 \n\n${userName} , ${response} ➖➖➖➖➖➖➖➖🔍✍️ 𝑪𝒉𝒆𝒊𝒌 𝑨𝒎𝒊𝒓 𝑩𝒐𝒕 \n `, messageID);
api.setMessageReaction("🇧🇫", event.messageID, () => {}, true);

 });
 }
 }
};
