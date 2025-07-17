
import React, { useState, useEffect } from 'react';
import KeyIcon from './icons/KeyIcon';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('user_api_key') || '';
      setApiKey(storedKey);
      setSaved(false); // Reset status simpan saat dibuka
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    localStorage.setItem('user_api_key', apiKey);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-slate-100 mb-4">Pengaturan Kunci API</h2>
        <p className="text-slate-400 text-sm mb-6">
          Kunci API Anda disimpan dengan aman di penyimpanan lokal browser Anda dan tidak pernah dikirim ke server kami. Jika tidak diisi, aplikasi akan menggunakan kunci API default dari administrator (jika ada).
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-slate-300 mb-2">
              Kunci API Google Gemini
            </label>
            <div className="relative">
              <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="api-key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Masukkan kunci API Anda di sini"
                className="w-full bg-slate-900/80 border border-slate-600 rounded-lg pl-10 pr-10 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label={showApiKey ? 'Sembunyikan kunci API' : 'Tampilkan kunci API'}
              >
                {showApiKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
            >
              {saved ? 'Tersimpan!' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
