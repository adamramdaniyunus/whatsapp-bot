const { SystemMessage, AIMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

async function handleAnswer(context) {
    const history = context.memoryHistory;

    const systemPrompt = `
        Kamu adalah asisten belajar matematika.
        Tugasmu adalah memberikan score pada soal yang sudah dikerjakan.
        Dan jika pengguna belum mendapatkan nilai sempurna berikan penjelasan pada jawaban yang salah.
        Jika pengguna selesai maka tanyakan apakah ingin berganti materi atau melanjutkan soal latihan.
    `;

    const lasttesUserMessage = await history.getMessages();

    const message = [
        new SystemMessage(systemPrompt),
        ...lasttesUserMessage.slice(-10)
    ];

    const response = await model.call(message)

    await history.addMessage(new AIMessage(response.content));
    context.isWaitingForAnswer = false;
    return response.content;

}


module.exports = handleAnswer;