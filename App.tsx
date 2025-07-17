
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import GeneratedScript from './components/GeneratedScript';
import { type GenerationParams, type Thread } from './types';
import Welcome from './components/Welcome';
import SettingsModal from './components/SettingsModal';
import SparklesIcon from './components/icons/SparklesIcon';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedThreads, setGeneratedThreads] = useState<Thread[] | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerateScript = useCallback(async (params: GenerationParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedThreads(null);

    try {
      // API Key sekarang ditangani secara otomatis oleh service melalui environment variables.
      const { generateThreadsScript } = await import('./services/geminiService');
      const threads = await generateThreadsScript(params);
      setGeneratedThreads(threads);
    } catch (err) {
      console.error(err);
      let errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      if (errorMessage.includes('Kunci API tidak ditemukan')) {
        errorMessage = 'Kunci API tidak ditemukan. Klik ikon gerigi di pojok kanan atas untuk menambahkannya.';
      } else if (errorMessage.includes('Kunci API yang disediakan tidak valid')) {
        errorMessage = 'Kunci API yang Anda berikan tidak valid. Silakan periksa kembali di pengaturan.';
      }
      setError(`Gagal membuat skrip. Penyebab: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />

      <main className="flex-grow flex flex-col items-center justify-start p-4 w-full z-10">
        <div className="text-center my-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center gap-3">
              <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              Threads Content Generator
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-400">
              Ubah idemu menjadi rangkaian thread yang viral. Cukup masukkan ide, pilih gaya, dan biarkan AI meracik kata-katanya.
            </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Form onSubmit={handleGenerateScript} isLoading={isLoading} />
          {error && (
            <div className="mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
              <p className="font-bold">Oops! Terjadi Kesalahan</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="mt-8 w-full">
             { !isLoading && !generatedThreads && <Welcome /> }
             <GeneratedScript threads={generatedThreads} isLoading={isLoading} />
          </div>

        </div>
      </main>
      <Footer />

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
