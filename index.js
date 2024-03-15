const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Telegram Bot Token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Your Instagram API endpoint for fetching data
const instagramAPIEndpoint = 'YOUR_INSTAGRAM_API_ENDPOINT';

// Function to fetch data from Instagram
async function fetchInstagramData() {
    try {
        const response = await axios.get(instagramAPIEndpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
        return null;
    }
}

// Command to trigger fetching and sending Instagram data
bot.onText(/\/instagram/, async (msg) => {
    const chatId = msg.chat.id;
    const instagramData = await fetchInstagramData();
    if (instagramData) {
        // Here you can format and send the fetched Instagram data to Telegram
        bot.sendMessage(chatId, 'Here is the latest Instagram data: ' + JSON.stringify(instagramData));
    } else {
        bot.sendMessage(chatId, 'Failed to fetch Instagram data. Please try again later.');
    }
});

// Start message
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the Instagram Telegram Bot. Use /instagram to get the latest Instagram data.');
});

// Help message
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Commands:\n/instagram - Get the latest Instagram data\n/help - Show this help message');
});

// Handle unsupported commands
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Unsupported command. Use /help to see available commands.');
});

// Polling mechanism to periodically fetch data from Instagram
setInterval(async () => {
    const instagramData = await fetchInstagramData();
    if (instagramData) {
        // Log the fetched data or perform any other actions
        console.log('Instagram data:', instagramData);
    } else {
        console.error('Failed to fetch Instagram data.');
    }
}, 3600000); // Fetch data every hour (adjust as needed)
