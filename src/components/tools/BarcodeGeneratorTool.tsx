import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Download } from 'lucide-react';

export const BarcodeGeneratorTool: React.FC = () => {
  const { language } = useLanguage();
  const [code, setCode] = useState('PROD-9948201');

  const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(code)}&scale=3&rotate=N&includetext`;

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300">
          {language === 'ar' ? 'رمز أو كود المنتج (CODE128):' : 'Enter Product Code or SKU (CODE128):'}
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. 123456789012"
          className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
        <div className="p-6 bg-white rounded-2xl shadow-xl">
          <img src={barcodeUrl} alt="Barcode" className="max-h-24 object-contain" />
        </div>

        <a
          href={barcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="barcode.png"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Download High Res Barcode</span>
        </a>
      </div>
    </div>
  );
};
