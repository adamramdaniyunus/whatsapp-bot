const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const dotenv = require('dotenv');
const { askAI } = require('./ai/ask_ai');

dotenv.config();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Client siap digunakan!');
});

client.on('message_create', async msg => {
    if (msg.fromMe) {
        // when message start with !ai send message to model AI
        // after AI give a response send back to messangger
        if (msg.body.startsWith("!ai")) {
            const prompt = msg.body.slice(5).trim();
            const response = await askAI(prompt, msg.to); // use our number phone
            msg.reply(response);
        }
    }
});

client.on('message', async (msg) => {
    if (msg.body.startsWith("!ai ")) {
        const prompt = msg.body.slice(5).trim();
        const response = await askAI(prompt, msg.from); // use phone number for userId
        msg.reply(response);
    }
});


client.initialize();
