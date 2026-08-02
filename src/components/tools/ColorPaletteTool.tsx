import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RefreshCw, Copy, Check } from 'lucide-react';

export const ColorPaletteTool: React.FC = () => {
  const { language } = useLanguage();

  const presets = [
    { name: 'Neon Purple Cyber', colors: ['#4f46e5', '#7c3aed', '#c084fc', '#f472b6', '#0f172a'] },
    { name: 'Emerald SaaS', colors: ['#059669', '#10b981', '#34d399', '#a7f3d0', '#064e3b'] },
    { name: 'Sunset Amber', colors: ['#d97706', '#f59e0b', '#fbbf24', '#fef3c7', '#78350f'] },
    { name: 'Oceanic Blue', colors: ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#0c4a6e'] }
  ];

  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const activePalette = presets[activePaletteIndex];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-white text-xs">{activePalette.name}</h4>
        <button
          onClick={() => setActivePaletteIndex((prev) => (prev + 1) % presets.length)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Generate Next Palette</span>
        </button>
      </div>

      <div className="grid grid-cols-5 h-36 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
        {activePalette.colors.map((color) => (
          <div
            key={color}
            onClick={() => handleCopy(color)}
            style={{ backgroundColor: color }}
            className="group relative cursor-pointer flex flex-col justify-end p-3 transition-transform hover:scale-105"
          >
            <div className="p-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px] text-center font-bold flex items-center justify-center gap-1">
              {copiedHex === color ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
              <span>{color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
