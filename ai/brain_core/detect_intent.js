const { SystemMessage, HumanMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

async function detectIntent(prompt) {
    const systemPrompt = `
        Kamu adalah sistem pendeteksi niat (intent) pengguna.
        Balas hanya dengan salah satu dari label berikut, dan jangan tambahkan penjelasan:
        - greeting
        - ask_explanation
        - start_exercise
        - submit_answer
        - end_session
        - switch_matery
        - unknown

        Aturan:
        - Jika pengguna menyapa, balas 'greeting'.
        - Jika pengguna ingin dijelaskan konsep matematika (misalnya: apa itu pecahan, rumus luas segitiga), balas 'ask_explanation'.
        - Jika pengguna meminta latihan soal, soal kuis, atau bertanya "berapa hasil dari..." (maksudnya ingin AI mengerjakan soal), balas 'start_exercise'.
        - Jika pengguna menjawab soal atau memberikan angka sebagai jawaban dari soal sebelumnya, balas 'submit_answer'.
        - Jika pengguna sudah memahami penjelasan dan ingin berganti materi balas 'switch_matery'
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


module.exports = detectIntent;