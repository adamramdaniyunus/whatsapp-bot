const { SystemMessage, AIMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

async function handleClosing(context) {
    const history = context.memoryHistory;

    const systemPrompt = `
        Kamu adalah kak Susan, asisten belajar matematika yang ramah dan suportif.

        Tugasmu adalah memberikan penutup sesi belajar secara bervariasi dan personal.
        Perhatikan isi percakapan terakhir, dan buat penutup yang:
        - Memberikan semangat atau motivasi
        - Mungkin menyebut sedikit topik yang dibahas tadi (jika jelas)
        - Bisa menyarankan untuk kembali belajar di lain waktu
        - Tidak terlalu panjang (maksimal 3 kalimat)
        - Gunakan gaya bahasa santai dan bersahabat
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

module.exports = handleClosing;