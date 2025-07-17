import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
        <div className="text-4xl mb-4 flex justify-center">{icon}</div>
        <h3 className="font-bold text-lg text-slate-200 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

const Welcome: React.FC = () => {
    return (
        <div className="text-center py-8 px-4">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">Selamat Datang di Threadsmate</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Mulai buat konten viral Anda hanya dalam tiga langkah mudah. Isi formulir di atas dan biarkan keajaiban terjadi!</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <FeatureCard 
                    icon="💡"
                    title="Tulis Ide Anda"
                    description="Mulai dengan topik atau ide kasar. Semakin jelas idenya, semakin baik hasilnya."
                />
                <FeatureCard 
                    icon="🎨"
                    title="Pilih Gaya"
                    description="Sesuaikan gaya bahasa dari profesional hingga humoris agar cocok dengan audiens Anda."
                />
                <FeatureCard 
                    icon="🚀"
                    title="Hasilkan & Publikasikan"
                    description="Dapatkan skrip lengkap dalam hitungan detik, siap untuk disalin dan dipublikasikan di Threads."
                />
            </div>
        </div>
    );
}

export default Welcome;