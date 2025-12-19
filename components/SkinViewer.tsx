
import React from 'react';
import { Skin } from '../App';

interface SkinViewerProps {
  skin: Skin | null;
  isLoading: boolean;
}

const SkinViewer: React.FC<SkinViewerProps> = ({ skin, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-[3/4] rounded-3xl bg-slate-800/50 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-0 opacity-50"></div>
        <div className="z-10 text-center animate-pulse">
          <div className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
          <p className="text-xl font-bold uppercase tracking-widest animate-bounce">Building Skin...</p>
          <p className="text-slate-400 text-sm mt-2">Connecting to Battle Royale Servers</p>
        </div>
      </div>
    );
  }

  if (!skin) {
    return (
      <div className="w-full aspect-[3/4] rounded-3xl bg-slate-800/30 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 group cursor-default">
        <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center text-3xl text-slate-500 group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-400">Ready to Deploy</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">Enter a description to generate your custom Fortnite character.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 bg-slate-900 transition-all hover:shadow-purple-500/10">
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
         <div className="bg-yellow-500 text-black font-black px-4 py-1 rounded-sm text-xs italic transform -skew-x-12 shadow-lg uppercase">
            Legendary
         </div>
         <div className="bg-slate-900/80 backdrop-blur-md text-white p-2 rounded-full flex items-center justify-center hover:bg-slate-800 cursor-pointer transition-colors shadow-lg border border-slate-700">
            <i className="fa-solid fa-share-nodes"></i>
         </div>
      </div>

      <img 
        src={skin.url} 
        alt={skin.prompt} 
        className="w-full h-auto block object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase italic transform -skew-x-12 tracking-tighter">
              {skin.prompt.split(' ').slice(0, 3).join(' ')}
            </h2>
            <p className="text-slate-400 text-sm max-w-md">"{skin.prompt}"</p>
            <div className="flex gap-4 mt-4 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
              <span className="flex items-center gap-1"><i className="fa-solid fa-user"></i> Character</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-shield"></i> Reactive</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-music"></i> Built-in Emote</span>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = skin.url;
              link.download = `fortnite-skin-${skin.id}.png`;
              link.click();
            }}
            className="btn-fortnite h-14 w-14 rounded-2xl flex items-center justify-center text-2xl text-white shadow-xl shadow-purple-600/20"
          >
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkinViewer;
