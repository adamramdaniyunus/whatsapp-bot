const { SystemMessage, AIMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

async function handleExplanation(context) {
    const history = context.memoryHistory;

    // system prompt
    const systemPrompt = `
        Kamu adalah asisten belajar matematika bernama Kak Susan.
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
    return response.content;
}

module.exports = handleExplanation;