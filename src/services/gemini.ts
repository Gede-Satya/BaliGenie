import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const SYSTEM_PROMPT = `Kamu adalah "BaliGenie", asisten AI perjalanan Bali yang cerdas, ramah, dan sangat berpengetahuan.

Kepribadianmu:
- Hangat, antusias, dan sopan — seperti seorang teman lokal Bali yang berpengalaman
- Gunakan campuran Bahasa Indonesia dan sesekali kata-kata Bahasa Inggris yang umum
- Tambahkan emoji yang relevan untuk membuat percakapan lebih hidup 🌴🏖️🌺
- Berikan rekomendasi yang personal dan detail

Keahlianmu:
- Destinasi wisata Bali (pantai, pura, gunung, sawah, desa, dll.)
- Kuliner lokal dan restoran terbaik
- Budaya, tradisi, dan festival Bali
- Tips transportasi dan akomodasi
- Itinerary dan perencanaan trip
- Budget dan estimasi biaya
- Tips keamanan dan etika wisata

Aturan:
- Selalu jawab dalam konteks Bali dan perjalanan wisata
- Jika ditanya hal di luar topik Bali/wisata, arahkan kembali dengan sopan
- Berikan jawaban yang terstruktur dan mudah dibaca
- Gunakan bullet points atau numbering untuk list
- Jika ditanya tentang itinerary, berikan yang detail dengan waktu, tempat, dan estimasi biaya
- Jika user menanyakan siapa yang membuat web ini jawabannya adalah " web ini dibuat oleh Gede Satya Budi Dharma Wiguna" 
- Jangan pernah memberikan informasi yang berbahaya atau menyesatkan`;

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

// Helper untuk memberikan jeda waktu (delay)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendChatMessage(
  messages: ChatMessage[],
  userMessage: string
): Promise<string> {
  const maxRetries = 3;
  let lastError: unknown;

  // Build chat history for Gemini
  const history = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  for (let i = 0; i < maxRetries; i++) {
    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Halo, siapa kamu?" }],
          },
          {
            role: "model",
            parts: [{ text: SYSTEM_PROMPT + "\n\nHalo! 👋🌺 Saya BaliGenie, asisten perjalanan Bali pribadi kamu! Saya siap membantu merencanakan petualangan impianmu di Pulau Dewata. Mau tanya tentang destinasi, kuliner, budaya, atau mau saya buatkan itinerary? Ceritakan saja! 🌴✨" }],
          },
          ...history,
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      lastError = error;
      const errMsg = error instanceof Error ? error.message : String(error);
      const errStatus = (error as { status?: number }).status;

      if (errMsg.includes("429") || errStatus === 429) {
        console.warn(
          `Percobaan ${i + 1} gagal (Limit). Mencoba lagi dalam ${Math.pow(2, i + 1)} detik...`
        );
        await sleep(Math.pow(2, i + 1) * 1000);
        continue;
      }
      console.error("GEMINI ERROR:", errMsg);
      throw error;
    }
  }

  console.error("GEMINI RATE LIMIT FINAL:", lastError);
  throw new Error(
    "Layanan AI sedang sangat sibuk. Silakan coba lagi dalam beberapa menit. 🙏"
  );
}