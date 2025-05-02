<!DOCTYPE html>
<html lang="id">
<body>
  <h1>📚 WANGSAP AI</h1>
  <p><strong>WANGSAP AI</strong> adalah chatbot WhatsApp yang dibangun dengan <code>whatsapp-web.js</code> dan terintegrasi dengan model AI <strong>Google Gemini</strong>. Chatbot ini berperan sebagai <strong>guru matematika virtual</strong> yang siap membantu pengguna memahami konsep matematika, menyelesaikan soal, dan belajar secara interaktif melalui WhatsApp.</p>

  <h2>✨ Fitur</h2>
  <ul>
    <li>🤖 Chatbot interaktif lewat WhatsApp</li>
    <li>🧠 Terhubung dengan AI Gemini untuk pemahaman bahasa alami</li>
    <li>📐 Fokus pada edukasi dan bantuan soal matematika</li>
    <li>📊 Mendukung penjelasan dari tingkat dasar hingga lanjutan (SMP - SMA)</li>
    <li>🔄 Menyimpan konteks dalam percakapan</li>
    <li>🧾 Memahami perintah seperti "Jelaskan teorema Pythagoras" atau "Bantu selesaikan persamaan ini"</li>
  </ul>

  <h2>🛠️ Teknologi yang Digunakan</h2>
  <ul>
    <li><a href="https://github.com/pedroslopez/whatsapp-web.js" target="_blank">whatsapp-web.js</a> – Library Node.js untuk mengakses WhatsApp Web</li>
    <li><a href="https://ai.google.dev" target="_blank">Google Gemini API</a> – Model AI untuk percakapan dan pemrosesan bahasa</li>
    <li>Node.js – Platform JavaScript untuk backend</li>
  </ul>

  <h2>🚀 Instalasi</h2>
  <ol>
    <li>Clone repositori:
      <pre><code>git clone https://github.com/adamramdaniyunus/whatsapp-bot.git
cd whatsapp-bot</code></pre>
    </li>
    <li>Instal dependensi:
      <pre><code>npm install</code></pre>
    </li>
    <li>Buat file <code>.env</code> dan isi dengan API key Gemini:
      <pre><code>GEMINI_API_KEY=api_key_anda</code></pre>
    </li>
    <li>Jalankan aplikasi:
      <pre><code>npm start</code></pre>
    </li>
  </ol>
  <p>Scan kode QR yang muncul di terminal untuk menghubungkan WhatsApp Anda.</p>

  <h2>💬 Cara Menggunakan</h2>
  <p>Setelah bot aktif, kirim pesan ke nomor WhatsApp yang terhubung. Contoh:</p>
  <ul>
    <li>"Jelaskan apa itu persamaan linear satu variabel"</li>
    <li>"Bantu saya menyelesaikan 2x + 5 = 11"</li>
    <li>"Apa itu turunan dalam kalkulus?"</li>
  </ul>
  <p>Bot akan merespons sebagai guru matematika dengan penjelasan yang mudah dipahami dan langkah-langkah penyelesaian.</p>

  <h2>🧠 Peran AI</h2>
  <p>Model Gemini dikonfigurasi untuk berperan sebagai <strong>guru matematika</strong>, sehingga:</p>
  <ul>
    <li>Jawaban bersifat edukatif dan instruktif</li>
    <li>Bot tidak hanya memberi jawaban, tetapi juga penjelasannya</li>
    <li>Menjelaskan langkah-langkah pengerjaan soal</li>
    <li>Mendorong proses belajar, bukan sekadar menyalin jawaban</li>
  </ul>

  <h2>📌 Contoh Percakapan</h2>
  <p><strong>Pengguna:</strong> Jelaskan rumus luas lingkaran!<br>
     <strong>MCP:</strong> Tentu! Luas lingkaran dihitung dengan rumus <code>L = π × r²</code>, di mana <code>r</code> adalah jari-jari. Misalnya, jika <code>r = 7</code>, maka luasnya adalah π × 7² = 154 cm² (dengan π ≈ 22/7).</p>

  <h2>📄 Lisensi</h2>
  <p>Lisensi © 2025 - Adam</p>
</body>
</html>
