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

        if (msg.hasMedia && msg.body.startsWith("!ai")) {
            const caption = msg.body || ''; // jika kosong, beri string kosong agar aman

            if (caption.startsWith("!ai")) {
                const media = await msg.downloadMedia();
                const prompt = caption.slice(5).trim(); // ambil prompt setelah "!ai"
                const response = await askAI(prompt, msg.to, media);
                msg.reply(response);
            }

            return;
        } 
        if (msg.body && msg.body.toString().startsWith("!ai")) {
            console.log(msg.body);
            
            const prompt = msg.body.slice(5).trim();
            const response = await askAI(prompt, msg.to); // use our number phone
            msg.reply(response);
        }
    }
});

client.on('message', async (msg) => {
    if (msg.from === '6285777615303@c.us') {
        if(msg.hasMedia) {
            const media = await msg.downloadMedia();
            const prompt = msg.body || ''; // jika kosong, beri string kosong agar aman
            const response = await askAI(prompt, msg.from, media);
            msg.reply(response);
        }else {
            const prompt = msg.body
            const response = await askAI(prompt, msg.from); // use phone number for userId
            msg.reply(response);
        }

    }
});


client.initialize();