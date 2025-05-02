const { SystemMessage, AIMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

async function handleExercise(context) {
    const history = context.memoryHistory;

    // system prompt
    const systemPrompt = `
        Kamu adalah asisten belajar matematika.
        Tugasmu adalah memberikan 5 contoh soal latihan.
        Pastikan soal latihan sesuai dengan topik: ${context.currentTopic || 'umum'}.

        Jika pengguna belum menjawab soal sebelumnya, wajibkan pengguna memberikan jawaban semampunya dahulu.
    `;

    const lasttesUserMessage = await history.getMessages();

    const messages = [
        new SystemMessage(systemPrompt),
        ...lasttesUserMessage.slice(-10) // memory message for context
    ];

    const response = await model.call(messages);

    // Save response to memory
    await history.addMessage(new AIMessage(response.content));

    // when user on state exercise
    context.isWaitingForAnswer = true;
    return response.content;

}

module.exports = handleExercise;