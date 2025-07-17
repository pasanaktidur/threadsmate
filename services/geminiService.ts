
import { GoogleGenAI, Type } from "@google/genai";
import { type GenerationParams, type Thread } from '../types';

const getAiClient = (): GoogleGenAI => {
    // Fungsi ini berjalan di browser, jadi memiliki akses ke localStorage.
    const userApiKey = typeof window !== 'undefined' ? localStorage.getItem('user_api_key') : null;

    if (userApiKey && userApiKey.trim() !== '') {
        return new GoogleGenAI({ apiKey: userApiKey });
    }

    // Ini adalah variabel waktu build. Akan diganti dengan nilainya selama build.
    // Jika tidak diatur, nilainya akan undefined.
    const envApiKey = process.env.API_KEY;

    if (envApiKey) {
        return new GoogleGenAI({ apiKey: envApiKey });
    }
    
    // Jika sampai di sini, tidak ada kunci yang tersedia.
    throw new Error("Kunci API tidak ditemukan.");
};

const generatePrompt = (params: GenerationParams): string => {
  return `
    Anda adalah seorang content creator ahli yang berspesialisasi dalam menulis skrip viral dan menarik untuk platform Threads.

    Tugas Anda adalah membuat rangkaian postingan yang saling terhubung (sebuah 'thread') berdasarkan detail berikut:

    - **Topik Utama:** ${params.idea}
    - **Target Audiens:** ${params.targetAudience}. Sesuaikan bahasa, gaya, dan contoh dengan audiens ini.
    - **Gaya Bahasa (Tone of Voice):** ${params.tone}
    - **Jenis Hook/Pembuka:** ${params.hook}. Mulai thread pertama dengan gaya hook ini untuk menarik perhatian maksimal.
    - **Jumlah Konten dalam Series:** ${params.threadCount}
    - **Call to Action (CTA) di Akhir:** "${params.callToAction || 'Buatlah CTA yang relevan dengan topik, seperti mengajak diskusi, follow, atau membagikan thread.'}". Pastikan CTA ini ada di postingan terakhir.

    **ATURAN KETAT:**
    1.  **Struktur JSON:** Respons HARUS berupa array JSON yang valid. Setiap elemen dalam array adalah sebuah objek yang merepresentasikan satu postingan thread.
    2.  **Format Objek:** Setiap objek HARUS memiliki satu properti: \`"content"\`, yang berisi teks untuk postingan tersebut.
    3.  **Keterkaitan:** Setiap postingan harus merupakan pemikiran yang utuh tetapi juga harus memancing pembaca untuk melanjutkan ke postingan berikutnya.
    4.  **Penutup & CTA:** Postingan terakhir harus memberikan kesimpulan yang memuaskan dan diakhiri dengan Call to Action yang telah ditentukan.
    5.  **Keringkasan:** Jaga agar setiap postingan tetap ringkas dan jauh di bawah batas karakter Threads (sekitar 250-300 karakter).
    6.  **Emoji:** Gunakan emoji secara strategis untuk meningkatkan keterlibatan dan memecah teks, namun jangan berlebihan.
    7.  **Bahasa:** Gunakan Bahasa Indonesia yang baik dan sesuai dengan gaya bahasa serta target audiens yang diminta.

    Contoh output JSON untuk 2 thread:
    \`\`\`json
    [
      { "content": "Ini adalah konten untuk thread pertama. Menarik, bukan? Lanjut di bawah ya!" },
      { "content": "Nah, ini kelanjutannya. Jangan lupa follow untuk tips lainnya!" }
    ]
    \`\`\`
  `;
};

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      content: {
        type: Type.STRING,
        description: 'Teks konten untuk postingan thread spesifik ini.'
      }
    },
    required: ['content']
  }
};

export const generateThreadsScript = async (params: GenerationParams): Promise<Thread[]> => {
  const prompt = generatePrompt(params);

  try {
    const ai = getAiClient();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.95,
      }
    });

    const jsonText = response.text.trim();
    let parsedData;

    try {
        parsedData = JSON.parse(jsonText);
    } catch(e) {
        console.error("Failed to parse JSON response from AI:", jsonText);
        throw new Error("Menerima respons tidak valid dari AI. Respons bukan JSON.");
    }

    if (!Array.isArray(parsedData) || parsedData.some(item => !item || typeof item.content !== 'string')) {
        throw new Error('Format data dari AI tidak sesuai skema yang diharapkan.');
    }

    return parsedData as Thread[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             throw new Error("Kunci API yang disediakan tidak valid. Silakan periksa kembali.");
        }
         if (error.message.includes('permission')) {
            throw new Error("Kunci API tidak memiliki izin yang diperlukan untuk model ini.");
        }
        if (error.message.includes('Kunci API tidak ditemukan')) {
            throw error;
        }
    }
    throw new Error("Gagal berkomunikasi dengan layanan AI. Pastikan Kunci API sudah benar dan coba lagi nanti.");
  }
};
