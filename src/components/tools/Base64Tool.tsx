import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Copy, Check } from 'lucide-react';

interface Base64ToolProps {
  defaultTab?: 'encode' | 'decode';
}

export const Base64Tool: React.FC<Base64ToolProps> = ({ defaultTab = 'encode' }) => {
  const { language } = useLanguage();
  const [tab, setTab] = useState<'encode' | 'decode'>(defaultTab);
  const [text, setText] = useState('Hello AI Studio 2026!');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    try {
      if (tab === 'encode') {
        setResult(btoa(text));
      } else {
        setResult(atob(text));
      }
    } catch (e) {
      setResult(tab === 'encode' ? 'Encoding error' : 'Invalid Base64 string');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setTab('encode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            tab === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Encode String
        </button>
        <button
          onClick={() => setTab('decode')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            tab === 'decode' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Decode Base64
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-300">
          {tab === 'encode' ? 'Input Plain Text:' : 'Input Base64 String:'}
        </label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
        />
      </div>

      <button
        onClick={handleProcess}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
      >
        {tab === 'encode' ? 'Encode to Base64' : 'Decode Base64'}
      </button>

      {result && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Result:</span>
            <button onClick={handleCopy} className="text-xs font-bold text-indigo-400 flex items-center gap-1">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Result'}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-white break-all">{result}</div>
        </div>
      )}
    </div>
  );
};
