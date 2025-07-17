
import React from 'react';
import GearIcon from './icons/GearIcon';
import CoffeeIcon from './icons/CoffeeIcon';

const Header: React.FC<{ onSettingsClick: () => void }> = ({ onSettingsClick }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 z-30 sticky top-0 bg-slate-900/70 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Left side */}
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-wide">
          Pasanaktidur
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href="https://lynk.id/pasanaktidur/s/re2yoep3v6r0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors duration-200 shadow-sm"
            aria-label="Traktir Kopi"
          >
            <CoffeeIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Traktir Kopi</span>
          </a>
          <button 
            onClick={onSettingsClick}
            className="p-2 rounded-full text-slate-400 hover:text-purple-400 hover:bg-slate-800/50 transition-all duration-200"
            aria-label="Pengaturan API Key"
          >
            <GearIcon className="w-7 h-7"/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
