import React, { useState } from 'react';
import { type GenerationParams, ToneStyle, HookType } from '../types';
import { TONE_STYLES, HOOK_TYPES } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface FormProps {
  onSubmit: (params: GenerationParams) => void;
  isLoading: boolean;
}

const formInputClasses = "w-full bg-slate-900/80 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200";

const Form: React.FC<FormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');
  const [tone, setTone] = useState<ToneStyle>(ToneStyle.SANTAI);
  const [hook, setHook] = useState<HookType>(HookType.PROBLEM_CALL_OUT);
  const [threadCount, setThreadCount] = useState<number>(5);
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [callToAction, setCallToAction] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idea.trim() || !targetAudience.trim() || isLoading) return;
    onSubmit({ idea, tone, threadCount, hook, targetAudience, callToAction });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-slate-300 mb-2">
            💡 Ide Konten Utama
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Contoh: 5 tips produktif bagi programmer yang bekerja dari rumah"
            className={formInputClasses}
            rows={3}
            required
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="hook" className="block text-sm font-medium text-slate-300 mb-2">
              🎣 Jenis Hook Pembuka
            </label>
            <select
              id="hook"
              value={hook}
              onChange={(e) => setHook(e.target.value as HookType)}
              className={formInputClasses}
            >
              {HOOK_TYPES.map((hookType) => (
                <option key={hookType} value={hookType}>{hookType}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">
              🎨 Gaya Penyampaian
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneStyle)}
              className={formInputClasses}
            >
              {TONE_STYLES.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="threadCount" className="block text-sm font-medium text-slate-300 mb-2">
              🔢 Jumlah Konten (series)
            </label>
            <select
              id="threadCount"
              value={threadCount}
              onChange={(e) => setThreadCount(Number(e.target.value))}
              className={formInputClasses}
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num} Series</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-300 mb-2">
                👥 Target Audiens
                </label>
                <input
                id="targetAudience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Contoh: Programmer, desainer, pebisnis online"
                className={formInputClasses}
                required
                aria-required="true"
                />
            </div>
            <div>
                <label htmlFor="callToAction" className="block text-sm font-medium text-slate-300 mb-2">
                📣 Call to Action (Opsional)
                </label>
                <input
                id="callToAction"
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder="Contoh: Follow untuk tips lainnya!"
                className={formInputClasses}
                />
            </div>
        </div>


        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !idea.trim() || !targetAudience.trim()}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-label="Memuat"></div>
                <span>Membuat Keajaiban...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Buat Skrip Sekarang
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;