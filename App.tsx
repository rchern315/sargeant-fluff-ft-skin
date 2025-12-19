
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import Header from './components/Header';
import SkinViewer from './components/SkinViewer';
import Controls from './components/Controls';
import Locker from './components/Locker';
import { generateFortniteSkin } from './services/geminiService';

export interface Skin {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [currentSkin, setCurrentSkin] = useState<Skin | null>(null);
  const [history, setHistory] = useState<Skin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (description: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateFortniteSkin(description);
      const newSkin: Skin = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: description,
        timestamp: Date.now(),
      };
      setCurrentSkin(newSkin);
      setHistory(prev => [newSkin, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate skin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectFromHistory = (skin: Skin) => {
    setCurrentSkin(skin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen gradient-bg pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Generator Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-purple-400"></i>
                Skin Factory
              </h2>
              <Controls onGenerate={handleGenerate} isLoading={isLoading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm flex items-start gap-3">
                  <i className="fa-solid fa-circle-exclamation mt-1"></i>
                  <p>{error}</p>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block">
               <Locker history={history} onSelect={selectFromHistory} activeId={currentSkin?.id} />
            </div>
          </div>

          {/* Right Column: Main Viewer */}
          <div className="lg:col-span-8">
            <SkinViewer skin={currentSkin} isLoading={isLoading} />
          </div>
        </div>
        
        {/* Mobile Locker */}
        <div className="lg:hidden mt-12">
          <Locker history={history} onSelect={selectFromHistory} activeId={currentSkin?.id} />
        </div>
      </main>
    </div>
  );
};

export default App;
