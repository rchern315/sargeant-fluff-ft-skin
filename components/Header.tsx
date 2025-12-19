
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <i className="fa-solid fa-dog text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="fortnite-font text-2xl tracking-tighter leading-none">
              FURRY <span className="text-purple-500">OPS</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Skin Generator Beta</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Locker</a>
          <a href="#" className="hover:text-white transition-colors">Item Shop</a>
          <a href="#" className="hover:text-white transition-colors">Career</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold italic">V</span>
            <span className="text-sm font-bold">2,500</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors">
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
