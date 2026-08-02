import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { QrCode, Download, Copy, Check } from 'lucide-react';

export const QrGeneratorTool: React.FC = () => {
  const { language } = useLanguage();
  const [text, setText] = useState('https://ai.studio');
  const [size, setSize] = useState(250);
  const [copied, setCopied] = useState(false);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrApiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">
            {language === 'ar' ? 'الرابط أو النص المطلوب تحويله إلى كود QR:' : 'Enter URL or Text for QR Code:'}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-300">Size:</label>
          {[200, 300, 400].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                size === s ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-white rounded-2xl shadow-xl">
          <img src={qrApiUrl} alt="QR Code" className="w-48 h-48 object-contain" />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={qrApiUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="qrcode.png"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </a>

          <button
            onClick={handleCopyUrl}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Image Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
