import React, { useState } from 'react';
import { type GenerationParams, ToneStyle, HookType, Language } from '../types';
import { TONE_STYLES, HOOK_TYPES, LANGUAGES } from '../constants';
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
  const [language, setLanguage] = useState<Language>(Language.INDONESIA);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idea.trim() || !targetAudience.trim() || isLoading) return;
    onSubmit({ idea, tone, threadCount, hook, targetAudience, callToAction, language });
  };

  // Define language-specific labels and placeholders
  const isIndonesian = language === Language.INDONESIA;
  const ideaLabel = isIndonesian ? "💡 Ide Konten Utama" : "💡 Main Content Idea";
  const ideaPlaceholder = isIndonesian 
    ? "Contoh: 5 tips produktif bagi programmer yang bekerja dari rumah" 
    : "Example: 5 productivity tips for programmers working from home";
  const hookLabel = isIndonesian ? "🎣 Jenis Hook Pembuka" : "🎣 Opening Hook Type";
  const toneLabel = isIndonesian ? "🎨 Gaya Penyampaian" : "🎨 Tone Style";
  const languageLabel = isIndonesian ? "🌐 Bahasa" : "🌐 Language";
  const threadCountLabel = isIndonesian ? "🔢 Jumlah Konten (series)" : "🔢 Content Count (series)";
  const targetAudienceLabel = isIndonesian ? "👥 Target Audiens" : "👥 Target Audience";
  const targetAudiencePlaceholder = isIndonesian 
    ? "Contoh: Programmer, desainer, pebisnis online" 
    : "Example: Programmers, designers, online business owners";
  const ctaLabel = isIndonesian ? "📣 Call to Action (Opsional)" : "📣 Call to Action (Optional)";
  const ctaPlaceholder = isIndonesian 
    ? "Contoh: Follow untuk tips lainnya!" 
    : "Example: Follow for more tips!";
  const buttonText = isIndonesian ? "Buat Skrip Sekarang" : "Create Script Now";
  const loadingText = isIndonesian ? "Membuat Keajaiban..." : "Creating Magic...";

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="idea" className="block text-sm font-medium text-slate-300 mb-2">
            {ideaLabel}
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={ideaPlaceholder}
            className={formInputClasses}
            rows={3}
            required
            aria-required="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="hook" className="block text-sm font-medium text-slate-300 mb-2">
              {hookLabel}
            </label>
            <select
              id="hook"
              value={hook}
              onChange={(e) => setHook(e.target.value as HookType)}
              className={formInputClasses}
            >
              {HOOK_TYPES.map((hookType) => {
                let example = "";
                const isIndonesian = language === Language.INDONESIA;
                
                switch(hookType) {
                  case HookType.PROBLEM_CALL_OUT:
                    example = isIndonesian 
                      ? "Contoh: Kesulitan menulis konten yang viral?" 
                      : "Example: Struggling to write viral content?";
                    break;
                  case HookType.TARGET_CALL_OUT:
                    example = isIndonesian 
                      ? "Contoh: Untuk para content creator yang ingin meningkatkan engagement" 
                      : "Example: For content creators who want to boost engagement";
                    break;
                  case HookType.POTENTIAL_BENEFIT:
                    example = isIndonesian 
                      ? "Contoh: Bayangkan bisa menghasilkan konten viral dalam 5 menit" 
                      : "Example: Imagine creating viral content in just 5 minutes";
                    break;
                  case HookType.SPECIFIC_NUMBER:
                    example = isIndonesian 
                      ? "Contoh: 5 teknik rahasia untuk konten viral yang jarang diketahui" 
                      : "Example: 5 secret techniques for viral content rarely known";
                    break;
                  case HookType.SOCIAL_PROOF:
                    example = isIndonesian 
                      ? "Contoh: 90% content creator sukses menggunakan teknik ini" 
                      : "Example: 90% of successful content creators use this technique";
                    break;
                  case HookType.ACTIVE_VOICE:
                    example = isIndonesian 
                      ? "Contoh: Saya menemukan cara membuat konten viral dalam seminggu" 
                      : "Example: I discovered how to create viral content in a week";
                    break;
                  case HookType.CONFIDENCE_CONVICTION:
                    example = isIndonesian 
                      ? "Contoh: Ini adalah strategi terbaik untuk konten viral, titik." 
                      : "Example: This is the best strategy for viral content, period.";
                    break;
                  case HookType.PATTERN_INTERRUPT:
                    example = isIndonesian 
                      ? "Contoh: Stop! Anda mungkin melakukan kesalahan ini dalam membuat konten" 
                      : "Example: Stop! You might be making this mistake in your content";
                    break;
                  case HookType.WARNING_CAUTION:
                    example = isIndonesian 
                      ? "Contoh: Awas! Kesalahan ini bisa menghancurkan engagement konten Anda" 
                      : "Example: Warning! This mistake could destroy your content engagement";
                    break;
                  case HookType.NEGATIVITY_BIAS:
                    example = isIndonesian 
                      ? "Contoh: Inilah mengapa konten Anda gagal mendapatkan engagement" 
                      : "Example: Here's why your content is failing to get engagement";
                    break;
                }
                return (
                  <option key={hookType} value={hookType}>{hookType} - {example}</option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">
              {toneLabel}
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
            <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-2">
              {languageLabel}
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className={formInputClasses}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="threadCount" className="block text-sm font-medium text-slate-300 mb-2">
              {threadCountLabel}
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
                {targetAudienceLabel}
                </label>
                <input
                id="targetAudience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder={targetAudiencePlaceholder}
                className={formInputClasses}
                required
                aria-required="true"
                />
            </div>
            <div>
                <label htmlFor="callToAction" className="block text-sm font-medium text-slate-300 mb-2">
                {ctaLabel}
                </label>
                <input
                id="callToAction"
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder={ctaPlaceholder}
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
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-label={isIndonesian ? "Memuat" : "Loading"}></div>
                <span>{loadingText}</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                {buttonText}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;