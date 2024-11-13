const axios = require('axios');

const fonts = {

    mathsans: {
        a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶",
    j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿",
    s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
    A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁", G: "𝙂", H: "𝙃", I: "𝙄",
    J: "𝙅", K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉", O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍",
    S: "𝙎", T: "𝙏", U: "𝙐", V: "𝙑", W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕",1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵", 0: "𝟬"
    }
};
const rolePlay = "quand tu réponds à cette question ajoutes des emojis convenables. :\n\n";

const Prefixes = [
  'ia',
  'ai',
  'temari',
  'ae',
];

module.exports = {
  config: {
    name: "ai",
    version: 1.0,
    author: "Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
      const prompt = event.body.substring(prefix.length).trim();
api.setMessageReaction("💬", event.messageID, () => {}, true);
      if (!prompt) {
        await message.reply("𝐣𝐞  𝐬𝐮𝐢𝐬 𝐝𝐚𝐦𝐢𝐛𝐚 𝐝𝐮 𝐩𝐫𝐨𝐯𝐢𝐧𝐜𝐢𝐚𝐥 𝐩𝐨𝐬𝐞 𝐭𝐚 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧");
        return;
      }
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(rolePlay + prompt)}`);
      const answer = `💬 L̑̈P̑̈B̑̈\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n${response.data.answer} \n▬▬▬▬▬▬▬▬▬▬▬▬▬`;
api.setMessageReaction("✅", event.messageID, () => {}, true);

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
