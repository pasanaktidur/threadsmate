
import { GoogleGenAI, Type } from "@google/genai";
import { type GenerationParams, type Thread } from '../types';

const getAiClient = (): GoogleGenAI => {
    // Fungsi ini berjalan di browser dan mendapatkan kunci API dari localStorage,
    // yang diatur oleh pengguna melalui modal pengaturan.
    const userApiKey = typeof window !== 'undefined' ? localStorage.getItem('user_api_key') : null;

    if (userApiKey && userApiKey.trim() !== '') {
        return new GoogleGenAI({ apiKey: userApiKey });
    }
    
    // Jika tidak ada kunci yang tersedia di localStorage, lempar error.
    // UI di App.tsx akan menangkap ini dan menampilkan pesan yang sesuai kepada pengguna.
    throw new Error("Kunci API tidak ditemukan.");
};

const generatePrompt = (params: GenerationParams): string => {
  // Determine language-specific instructions and examples
  const isIndonesian = params.language === 'Indonesia';
  
  // Language-specific role description
  const roleDescription = isIndonesian
    ? "Anda adalah seorang content creator ahli yang berspesialisasi dalam menulis skrip viral dan menarik untuk platform Threads."
    : "You are an expert content creator specializing in writing viral and engaging scripts for the Threads platform.";
  
  // Language-specific task description
  const taskDescription = isIndonesian
    ? `Tugas Anda adalah membuat rangkaian postingan yang saling terhubung (sebuah 'thread') berdasarkan detail berikut:`
    : `Your task is to create a series of connected posts (a 'thread') based on the following details:`;
  
  // Language-specific parameters labels
  const topicLabel = isIndonesian ? "Topik Utama" : "Main Topic";
  const audienceLabel = isIndonesian ? "Target Audiens" : "Target Audience";
  const audienceInstructions = isIndonesian
    ? "Sesuaikan bahasa, gaya, dan contoh dengan audiens ini."
    : "Adapt language, style, and examples to this audience.";
  const toneLabel = isIndonesian ? "Gaya Bahasa (Tone of Voice)" : "Tone of Voice";
  const hookLabel = isIndonesian ? "Jenis Hook/Pembuka" : "Hook Type";
  const hookInstructions = isIndonesian
    ? "Mulai thread pertama dengan gaya hook ini untuk menarik perhatian maksimal."
    : "Start the first thread with this hook style to maximize attention.";
  const countLabel = isIndonesian ? "Jumlah Konten dalam Series" : "Number of Posts in Series";
  const ctaLabel = isIndonesian ? "Call to Action (CTA) di Akhir" : "Call to Action (CTA) at the End";
  const defaultCta = isIndonesian
    ? "Buatlah CTA yang relevan dengan topik, seperti mengajak diskusi, follow, atau membagikan thread."
    : "Create a CTA relevant to the topic, such as encouraging discussion, following, or sharing the thread.";
  const ctaInstructions = isIndonesian
    ? "Pastikan CTA ini ada di postingan terakhir."
    : "Make sure this CTA is in the last post.";
  
  // Language-specific rules
  const rulesTitle = isIndonesian ? "ATURAN KETAT" : "STRICT RULES";
  const rule1 = isIndonesian
    ? "Struktur JSON: Respons HARUS berupa array JSON yang valid. Setiap elemen dalam array adalah sebuah objek yang merepresentasikan satu postingan thread."
    : "JSON Structure: Response MUST be a valid JSON array. Each element in the array is an object representing one thread post.";
  const rule2 = isIndonesian
    ? "Format Objek: Setiap objek HARUS memiliki satu properti: \`\"content\"\`, yang berisi teks untuk postingan tersebut."
    : "Object Format: Each object MUST have one property: \`\"content\"\`, which contains the text for that post.";
  const rule3 = isIndonesian
    ? "Keterkaitan: Setiap postingan harus merupakan pemikiran yang utuh tetapi juga harus memancing pembaca untuk melanjutkan ke postingan berikutnya."
    : "Connectivity: Each post must be a complete thought but also entice readers to continue to the next post.";
  const rule4 = isIndonesian
    ? "Penutup & CTA: Postingan terakhir harus memberikan kesimpulan yang memuaskan dan diakhiri dengan Call to Action yang telah ditentukan."
    : "Closing & CTA: The last post must provide a satisfying conclusion and end with the specified Call to Action.";
  const rule5 = isIndonesian
    ? "Keringkasan: Jaga agar setiap postingan tetap ringkas dan jauh di bawah batas karakter Threads (sekitar 250-300 karakter)."
    : "Brevity: Keep each post concise and well below the Threads character limit (about 250-300 characters).";
  const rule6 = isIndonesian
    ? "Emoji: Gunakan emoji secara strategis untuk meningkatkan keterlibatan dan memecah teks, namun jangan berlebihan."
    : "Emoji: Use emojis strategically to increase engagement and break up text, but don't overdo it.";
  const rule7 = isIndonesian
    ? "Bahasa: Gunakan Bahasa Indonesia yang baik dan sesuai dengan gaya bahasa serta target audiens yang diminta."
    : "Language: Use proper English that matches the requested tone and target audience.";
  
  // Language-specific examples
  const exampleIntro = isIndonesian
    ? "Contoh output JSON untuk 2 thread:"
    : "Example JSON output for 2 threads:";
  const exampleContent1 = isIndonesian
    ? "Ini adalah konten untuk thread pertama. Menarik, bukan? Lanjut di bawah ya!"
    : "This is content for the first thread. Interesting, right? Continue below!";
  const exampleContent2 = isIndonesian
    ? "Nah, ini kelanjutannya. Jangan lupa follow untuk tips lainnya!"
    : "Here's the continuation. Don't forget to follow for more tips!";
  
  return `
    ${roleDescription}

    ${taskDescription}

    - **${topicLabel}:** ${params.idea}
    - **${audienceLabel}:** ${params.targetAudience}. ${audienceInstructions}
    - **${toneLabel}:** ${params.tone}
    - **${hookLabel}:** ${params.hook}. ${hookInstructions}
    - **${countLabel}:** ${params.threadCount}
    - **${ctaLabel}:** "${params.callToAction || defaultCta}". ${ctaInstructions}

    **${rulesTitle}:**
    1.  **${rule1}**
    2.  **${rule2}**
    3.  **${rule3}**
    4.  **${rule4}**
    5.  **${rule5}**
    6.  **${rule6}**
    7.  **${rule7}**

    ${exampleIntro}
    \`\`\`json
    [
      { "content": "${exampleContent1}" },
      { "content": "${exampleContent2}" }
    ]
    \`\`\`
  `;
}
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