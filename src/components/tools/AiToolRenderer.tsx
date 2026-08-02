import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Tool } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Copy, Check, RefreshCw, AlertCircle, Send } from 'lucide-react';

interface AiToolRendererProps {
  tool: Tool;
}

export const AiToolRenderer: React.FC<AiToolRendererProps> = ({ tool }) => {
  const { language } = useLanguage();
  const { addHistoryItem } = useAuth();

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (id: string, val: string) => {
    setInputValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          language === 'ar'
            ? 'مفتاح Gemini API غير معرف. يرجى التأكد من الضبط.'
            : 'Gemini API key is required. Please set the environment variable.'
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      const promptParts = Object.entries(inputValues)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');

      const fullPrompt = `${tool.systemPrompt || ''}\n\nTask details:\nLanguage: ${language === 'ar' ? 'Arabic' : 'English'}\n${promptParts}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      const resultText = response.text || '';
      setOutput(resultText);

      addHistoryItem({
        toolId: tool.id,
        toolName: language === 'ar' ? tool.nameAr : tool.nameEn,
        input: promptParts || 'Standard execution',
        output: resultText,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during AI generation.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleGenerate} className="space-y-4">
        {tool.inputs && tool.inputs.length > 0 ? (
          tool.inputs.map((inp) => (
            <div key={inp.id} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                {language === 'ar' ? inp.labelAr : inp.labelEn}
              </label>

              {inp.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={inputValues[inp.id] || ''}
                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                  placeholder={language === 'ar' ? inp.placeholderAr : inp.placeholderEn}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                />
              ) : inp.type === 'select' ? (
                <select
                  value={inputValues[inp.id] || ''}
                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="">-- {language === 'ar' ? 'اختر خياراً' : 'Select Option'} --</option>
                  {inp.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {language === 'ar' ? opt.labelAr : opt.labelEn}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={inputValues[inp.id] || ''}
                  onChange={(e) => handleInputChange(inp.id, e.target.value)}
                  placeholder={language === 'ar' ? inp.placeholderAr : inp.placeholderEn}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                />
              )}
            </div>
          ))
        ) : (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              {language === 'ar' ? 'أدخل تعليماتك أو طلبك للذكاء الاصطناعي' : 'Enter Prompt or Requirements'}
            </label>
            <textarea
              rows={4}
              value={inputValues['customPrompt'] || ''}
              onChange={(e) => handleInputChange('customPrompt', e.target.value)}
              placeholder={language === 'ar' ? 'مثال: اكتب لي مقالاً عن مستقبل الذكاء الاصطناعي...' : 'e.g. Write a persuasive product introduction...'}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{language === 'ar' ? 'جاري المعالجة بواسطة Gemini...' : 'Generating with Gemini...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'توليد المحتوى الآن' : 'Generate Content'}</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {output && (
        <div className="space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'ar' ? 'النتيجة المولدة:' : 'Generated Result:'}</span>
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ النص' : 'Copy Result')}</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm whitespace-pre-line leading-relaxed shadow-inner">
            {output}
          </div>
        </div>
      )}

    </div>
  );
};
