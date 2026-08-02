import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const WordCounterTool: React.FC = () => {
  const { language } = useLanguage();
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-xl font-black text-indigo-400">{words}</div>
          <div className="text-[11px] text-slate-400 font-semibold">{language === 'ar' ? 'الكلمات' : 'Words'}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-xl font-black text-purple-400">{characters}</div>
          <div className="text-[11px] text-slate-400 font-semibold">{language === 'ar' ? 'الحروف' : 'Characters'}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-xl font-black text-emerald-400">{sentences}</div>
          <div className="text-[11px] text-slate-400 font-semibold">{language === 'ar' ? 'الجمل' : 'Sentences'}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div className="text-xl font-black text-amber-400">~{readingTime} min</div>
          <div className="text-[11px] text-slate-400 font-semibold">{language === 'ar' ? 'وقت القراءة' : 'Reading Time'}</div>
        </div>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={language === 'ar' ? 'ألصق أو اكتب نصك هنا لتحليل الكلمات...' : 'Paste or type your text here to count words...'}
        className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
      />
    </div>
  );
};
