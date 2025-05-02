<!DOCTYPE html>
<html lang="en">
<body>
  <h1>📚 MCP - Math Chatbot for WhatsApp</h1>
  <p><strong>MCP (Math Chatbot Pintar)</strong> is a WhatsApp chatbot powered by <code>whatsapp-web.js</code> and <strong>Google Gemini</strong> as the AI engine. The chatbot acts as a <strong>virtual math teacher</strong>, ready to help users understand math concepts, solve problems, and learn interactively via WhatsApp.</p>

  <h2>✨ Features</h2>
  <ul>
    <li>🤖 Interactive chatbot through WhatsApp</li>
    <li>🧠 Integrated with Gemini AI for natural language understanding</li>
    <li>📐 Focused on math education and problem-solving</li>
    <li>📊 Supports explanations from basic to advanced levels (middle to high school)</li>
    <li>🔄 Maintains context within the conversation</li>
    <li>🧾 Understands requests like "Explain the Pythagorean theorem" or "Help me solve this equation"</li>
  </ul>

  <h2>🛠️ Technologies Used</h2>
  <ul>
    <li><a href="https://github.com/pedroslopez/whatsapp-web.js" target="_blank">whatsapp-web.js</a> – Node.js library to access WhatsApp Web programmatically</li>
    <li><a href="https://ai.google.dev" target="_blank">Google Gemini API</a> – Conversational AI model for NLP</li>
    <li>Node.js – Backend JavaScript runtime</li>
  </ul>

  <h2>🚀 Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/adamramdaniyunus/whatsapp-bot.git
cd mcp</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file with your Gemini API key:
      <pre><code>GEMINI_API_KEY=your_gemini_api_key</code></pre>
    </li>
    <li>Start the bot:
      <pre><code>npm start</code></pre>
    </li>
  </ol>
  <p>Scan the QR code in the terminal to connect your WhatsApp account.</p>

  <h2>💬 How to Use</h2>
  <p>Once the bot is active, send a message to your connected WhatsApp number, for example:</p>
  <ul>
    <li>"Explain what a linear equation is"</li>
    <li>"Help me solve 2x + 5 = 11"</li>
    <li>"What is a derivative in calculus?"</li>
  </ul>
  <p>The bot will respond as a math teacher, providing easy-to-understand explanations and steps.</p>

  <h2>🧠 AI Role Context</h2>
  <p>The Gemini model is configured to act as a <strong>math teacher</strong>, meaning:</p>
  <ul>
    <li>Responses are educational and instructional</li>
    <li>The bot does not just give answers — it explains them</li>
    <li>Step-by-step problem solving is prioritized</li>
    <li>Encourages learning rather than copying solutions</li>
  </ul>

  <h2>📌 Example Conversation</h2>
  <p><strong>User:</strong> Explain the area formula of a circle!<br>
     <strong>MCP:</strong> Sure! The area of a circle is calculated with the formula <code>A = π × r²</code>, where <code>r</code> is the radius. For example, if <code>r = 7</code>, then the area is π × 7² = 154 cm² (using π ≈ 22/7).</p>

  <h2>📄 License</h2>
  <p>MIT License © 2025 - Adam</p>
</body>
</html>
