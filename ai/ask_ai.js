const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatMessageHistory } = require('langchain/stores/message/in_memory');
const { HumanMessage, AIMessage, SystemMessage } = require('@langchain/core/messages');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY,
});

const context = `
Kamu adalah AI asisten bernama Jery. Tugasmu adalah membantu pengguna belajar matematika.
Jangan langsung memberikan jawaban, tetapi ajari pengguna dengan cara memberi soal yang mirip,
beserta langkah-langkah dan penjelasannya.
`;

// initial state
const contextState = {};


// intent state :
// ask_explanation
// start_exercise
// submit_answer

async function askAI(prompt, userId) {

    // get context from memory
    let context = contextState[userId] || {
        currentTopic: null,
        currentIntent: null,
        lastScore: null,
        isWaitingForAnswer: false,
        memoryHistory: new ChatMessageHistory(),
    }

    // if context is not available
    if (!context.currentTopic) {
        context.currentTopic = detectTopic(prompt);
    }

    // detect intent
    context.currentIntent = detectIntent(prompt);

    // check is user asking for explanation -> process 1

    // AI give a explanation -> process 1 YES
    // then AI will asking to user he want continue to next material or exercise -> process 2

    // if user want exercise AI will give 10 exercise -> process 2 YES
    // if user got 10 score AI will ask continue or end session -> process 2 NEXT STEP
    // if not AI will ask for rework, continue, or end session -> process 2 NEXT STEP

    // if user do not want exercise AI will ask for the next material -> process 2 NO

    // if not AI will asking to user does he want to be explained -> process 1 NO


    let response;
    switch (context.currentIntent) {
        case 'ask_explanation':
            break;
        case 'start_exercise':
            break;
        case 'submit_answer':
            break;
        default:
            response = await model.call([new HumanMessage(prompt)]);
    }

    // save context
    contextState[userId] = context;

    return response.content;
}


async function detectTopic(prompt) { }

async function detectIntent(prompt) { }


module.exports = { askAI };