const { SystemMessage, HumanMessage } = require("@langchain/core/messages");
const model = require("../../model/model_ai");

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


module.exports = detectTopic;