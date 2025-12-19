
import React from 'react';
import { Skin } from '../App';

interface LockerProps {
  history: Skin[];
  onSelect: (skin: Skin) => void;
  activeId?: string;
}

const Locker: React.FC<LockerProps> = ({ history, onSelect, activeId }) => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-briefcase text-blue-400"></i>
          Your Locker
        </h2>
        <span className="text-[10px] font-bold bg-slate-700 px-2 py-0.5 rounded text-slate-300">
          {history.length} ITEMS
        </span>
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center border-2 border-dashed border-slate-700/50 rounded-xl">
          <i className="fa-solid fa-ghost text-2xl text-slate-600 mb-2"></i>
          <p className="text-xs text-slate-500 uppercase font-bold">Locker Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {history.map((skin) => (
            <button
              key={skin.id}
              onClick={() => onSelect(skin)}
              className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                activeId === skin.id 
                  ? 'border-yellow-500 scale-[0.98] ring-2 ring-yellow-500/20 shadow-lg shadow-yellow-500/10' 
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <img 
                src={skin.url} 
                alt={skin.prompt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-[8px] text-white font-bold truncate uppercase">{skin.prompt}</p>
              </div>
              {activeId === skin.id && (
                <div className="absolute top-1 right-1 bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase italic">
                  Equipped
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Locker;
