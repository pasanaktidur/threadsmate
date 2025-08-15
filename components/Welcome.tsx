import React, { useEffect, useState } from 'react';
import { Language } from '../types';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
        <div className="text-4xl mb-4 flex justify-center">{icon}</div>
        <h3 className="font-bold text-lg text-slate-200 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

interface WelcomeProps {
    language?: Language;
}

const Welcome: React.FC<WelcomeProps> = ({ language = Language.INDONESIA }) => {
    const [welcomeTitle, setWelcomeTitle] = useState('Selamat Datang di Threadsmate');
    const [welcomeDesc, setWelcomeDesc] = useState('Mulai buat konten viral Anda hanya dalam tiga langkah mudah. Isi formulir di atas dan biarkan keajaiban terjadi!');
    const [featureCards, setFeatureCards] = useState([
        {
            icon: '💡',
            title: 'Tulis Ide Anda',
            description: 'Mulai dengan topik atau ide kasar. Semakin jelas idenya, semakin baik hasilnya.'
        },
        {
            icon: '🎨',
            title: 'Pilih Gaya',
            description: 'Sesuaikan gaya bahasa dari profesional hingga humoris agar cocok dengan audiens Anda.'
        },
        {
            icon: '🚀',
            title: 'Hasilkan & Publikasikan',
            description: 'Dapatkan skrip lengkap dalam hitungan detik, siap untuk disalin dan dipublikasikan di Threads.'
        }
    ]);

    useEffect(() => {
        if (language === Language.ENGLISH) {
            setWelcomeTitle('Welcome to Threadsmate');
            setWelcomeDesc('Start creating your viral content in just three easy steps. Fill out the form above and let the magic happen!');
            setFeatureCards([
                {
                    icon: '💡',
                    title: 'Write Your Idea',
                    description: 'Start with a topic or rough idea. The clearer the idea, the better the results.'
                },
                {
                    icon: '🎨',
                    title: 'Choose a Style',
                    description: 'Customize the tone from professional to humorous to match your audience.'
                },
                {
                    icon: '🚀',
                    title: 'Generate & Publish',
                    description: 'Get a complete script in seconds, ready to be copied and published on Threads.'
                }
            ]);
        } else {
            setWelcomeTitle('Selamat Datang di Threadsmate');
            setWelcomeDesc('Mulai buat konten viral Anda hanya dalam tiga langkah mudah. Isi formulir di atas dan biarkan keajaiban terjadi!');
            setFeatureCards([
                {
                    icon: '💡',
                    title: 'Tulis Ide Anda',
                    description: 'Mulai dengan topik atau ide kasar. Semakin jelas idenya, semakin baik hasilnya.'
                },
                {
                    icon: '🎨',
                    title: 'Pilih Gaya',
                    description: 'Sesuaikan gaya bahasa dari profesional hingga humoris agar cocok dengan audiens Anda.'
                },
                {
                    icon: '🚀',
                    title: 'Hasilkan & Publikasikan',
                    description: 'Dapatkan skrip lengkap dalam hitungan detik, siap untuk disalin dan dipublikasikan di Threads.'
                }
            ]);
        }
    }, [language]);
    return (
        <div className="text-center py-8 px-4">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">{welcomeTitle}</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{welcomeDesc}</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {featureCards.map((card, index) => (
                    <FeatureCard 
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Welcome;