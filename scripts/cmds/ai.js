const axios = require('axios');

// Function to handle commands and process the AI response
async function handleCommand(api, event, args) {
    try {
        const question = args.join(" ").trim();

        if (!question) {
            return api.sendMessage("🍀je suis l'intelligence artificielle de boulsa 🍀 \n posez votre question  ", event.threadID, event.messageID);
        }

        const response = await getAIResponse(api, question, event.senderID);

        api.sendMessage(response, event.threadID, event.messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
}

// Function to fetch the answer from AI
async function getAnswerFromAI(api, question, senderID) {
    const uid = senderID; // User UID to pass in API calls
    const apiUrl = `https://kaiz-apis.gleeze.com/ helpful ai&prompt=${encodeURIComponent(question)}`;

    const data = await fetchFromAI(apiUrl);
    if (data) return data;

    throw new Error("No valid response from AI service");
}

// Function to fetch data from the AI service
async function fetchFromAI(url) {
    try {
        const { data } = await axios.get(url);
        const response = data.response; // Accessing the response directly

        if (typeof response === 'string') {
            console.log("AI Response:", response);
            return response;
        }
        return null;
    } catch (error) {
        console.error("Error in fetchFromAI:", error.message);
        return null;
    }
}

// Main function to get the AI response
async function getAIResponse(api, input, senderID) {
    const query = input.trim() || "hi";
    const response = await getAnswerFromAI(api, query, senderID);
    return response;
}

// Bot Configuration and Command Handler
module.exports = {
    config: {
        name: 'ai',
        author: 'Dev-hack',
        role: 0,
        category: 'ai',
        shortDescription: 'AI to answer any question',
    },
    // Triggered when the command is invoked
    onStart: async function ({ api, event, args }) {
        await handleCommand(api, event, args);
    },
    // Handles incoming chat messages
    onChat: async function ({ api, event }) {
        const messageContent = event.body.trim().toLowerCase();

        // Command is triggered by any message that starts with "ai"
        if (messageContent.startsWith("ai") && event.senderID !== api.getCurrentUserID()) {
            const input = messageContent.replace(/^ai\s*/, "").trim();
            await handleCommand(api, event, [input]);
        }
    }
};
