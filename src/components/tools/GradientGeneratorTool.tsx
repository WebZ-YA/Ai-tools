import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Copy, Check } from 'lucide-react';

export const GradientGeneratorTool: React.FC = () => {
  const { language } = useLanguage();
  const [color1, setColor1] = useState('#4f46e5');
  const [color2, setColor2] = useState('#c084fc');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const cssGradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const tailwindClass = `bg-gradient-to-r from-[${color1}] to-[${color2}]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${cssGradient};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-300">Color 1</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-300">Color 2</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-300">Angle ({angle}°)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full mt-3 accent-indigo-500"
          />
        </div>
      </div>

      <div
        style={{ background: cssGradient }}
        className="h-44 rounded-3xl border border-slate-800 flex items-center justify-center p-6 shadow-2xl"
      >
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/20 flex items-center gap-2 hover:bg-slate-950"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'CSS Copied!' : 'Copy CSS Code'}</span>
        </button>
      </div>
    </div>
  );
};
