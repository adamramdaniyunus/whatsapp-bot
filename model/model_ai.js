const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY,
});


module.exports = model;