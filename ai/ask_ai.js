const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatMessageHistory } = require('langchain/stores/message/in_memory');
const { HumanMessage, AIMessage, SystemMessage } = require('@langchain/core/messages');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY,
});

// initial state
const contextState = {};


// intent state :
// ask_explanation
// start_exercise
// submit_answer


// check is user asking for explanation -> process 1

// AI give a explanation -> process 1 YES
// then AI will asking to user he want continue to next material or exercise -> process 2

// if user want exercise AI will give 10 exercise -> process 2 YES
// if user got 10 score AI will ask continue or end session -> process 2 NEXT STEP
// if not AI will ask for rework, continue, or end session -> process 2 NEXT STEP

// if user do not want exercise AI will ask for the next material -> process 2 NO

// if not AI will asking to user does he want to be explained -> process 1 NO

async function askAI(prompt, userId) {

    // get context from memory
    let context = contextState[userId] || {
        currentTopic: null,
        currentIntent: null,
        lastScore: null,
        isWaitingForAnswer: false,
        memoryHistory: new ChatMessageHistory(),
    }

    // save prompt to memory
    const history = context.memoryHistory;
    await history.addMessage(new HumanMessage(prompt));

    context.currentIntent = await detectIntent(prompt);

    const intentNeedsTopic = ['ask_explanation', 'start_exercise', 'submit_answer'];
    if (intentNeedsTopic.includes(context.currentIntent) && !context.currentTopic) {
        context.currentTopic = await detectTopic(prompt);
    }

    let response;
    switch (context.currentIntent) {
        case 'greeting':
            response = 'Hai!, mau belajar materi apa hari ini?'
            break;
        case "end_session":
            delete contextState[userId];
            response = "Baik! Sampai jumpa lagi. Semoga harimu menyenangkan. 😊";
            break;
        case 'ask_explanation':
            response = await handleExplanation(context);
            break;
        case 'start_exercise':
            response = await handleExercise(context);
            break;
        case 'submit_answer':
            response = await handleAnswer(context);
            break;
        default:
            response = await model.call([new HumanMessage(prompt)]);
    }

    // save context
    contextState[userId] = context;

    return response;
}


async function detectTopic(prompt) {
    const systemPrompt = `
        Kamu adalah sistem pendeteksi topic materi.
        Balas hanya dengan label seperti: aljabar, trigonometri, fungsi kuadrat, dll, dan jangan tambahkan penjelasan:
    `
    const messages = [
        new SystemMessage(systemPrompt),
        new HumanMessage(prompt)
    ];

    const response = await model.call(messages);
    return response.content.trim().toLowerCase();
}

async function detectIntent(prompt) {
    const systemPrompt = `
        Kamu adalah sistem pendeteksi niat (intent) pengguna.
        Balas hanya dengan salah satu dari label berikut, dan jangan tambahkan penjelasan:
        - greeting
        - ask_explanation
        - start_exercise
        - submit_answer
        - end_session
        - unknown

        Aturan:
        - Jika pengguna menyapa, balas 'greeting'.
        - Jika pengguna ingin dijelaskan konsep matematika (misalnya: apa itu pecahan, rumus luas segitiga), balas 'ask_explanation'.
        - Jika pengguna meminta latihan soal, soal kuis, atau bertanya "berapa hasil dari..." (maksudnya ingin AI mengerjakan soal), balas 'start_exercise'.
        - Jika pengguna menjawab soal atau memberikan angka sebagai jawaban dari soal sebelumnya, balas 'submit_answer'.
        - Jika pengguna ingin mengakhiri pembelajaran, balas 'end_session'.
        - Jika konteksnya tidak jelas, balas 'unknown'.
    `;


    const messages = [
        new SystemMessage(systemPrompt),
        new HumanMessage(prompt)
    ];

    const response = await model.call(messages);
    return response.content.trim().toLowerCase();
}

async function handleExplanation(context) {
    const history = context.memoryHistory;

    // system prompt
    const systemPrompt = `
        Kamu adalah asisten belajar matematika bernama Jery.
        Tugasmu adalah membantu menjelaskan konsep matematika dengan cara sederhana dan interaktif.

        Jika pengguna menanyakan jawaban soal secara langsung, jangan berikan jawabannya.
        Sebaliknya, berikan soal serupa dengan langkah-langkah penyelesaiannya sebagai pembelajaran.

        Penjelasan harus sesuai topik: ${context.currentTopic || 'umum'}.
        Gunakan gaya santai dan edukatif.
    `;

    const lasttesUserMessage = await history.getMessages();
    // const prompt = lasttesUserMessage.at(-1) // new message from user

    const messages = [
        new SystemMessage(systemPrompt),
        ...lasttesUserMessage.slice(-10) // memory message for context
    ]

    const response = await model.call(messages);

    // save AI response to history
    await history.addMessage(new AIMessage(response.content));

    context.isWaitingForAnswer = true;
    return response.content;
}

async function handleExercise(context) {
    const history = context.memoryHistory;

    // system prompt
    const systemPrompt = `
        Kamu adalah asisten belajar matematika.
        Tugasmu adalah memberikan 5 contoh soal latihan.
        Pastikan soal latihan sesuai dengan topik: ${context.currentTopic || 'umum'}.
    `;

    const lasttesUserMessage = await history.getMessages();

    const messages = [
        new SystemMessage(systemPrompt),
        ...lasttesUserMessage.slice(-10) // memory message for context
    ];

    const response = await model.call(messages);

    // Save response to memory
    await history.addMessage(new AIMessage(response.content));

    return response.content;

}

async function handleAnswer(context) {
    const history = context.memoryHistory;

    const systemPrompt = `
        Kamu adalah asisten belajar matematika.
        Tugasmu adalah memberikan score pada soal yang sudah dikerjakan.
        Jika pengguna baru salah 1x jangan dulu berikan penjelasan dan berikan kesempatan agar dapat menjawabnya 1x lagi.
        Jika pengguna sudah mendapatkan nilai sempurna maka tanyakan apakah ingin berganti materi atau lanjut soal latihan baru.
    `;

    const lasttesUserMessage = await history.getMessages();

    const message = [
        new SystemMessage(systemPrompt),
        ...lasttesUserMessage.slice(-10)
    ];

    const response = await model.call(message)

    await history.addMessage(new AIMessage(response.content));
    return response.content;

}

module.exports = { askAI };