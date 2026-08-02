import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';

export const JsonFormatterTool: React.FC = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('{"name":"SaaS Toolkit","tools":35,"active":true}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-300">Raw JSON String:</label>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste raw JSON here..."
          className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleFormat}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
        >
          Pretty Print JSON
        </button>
        <button
          onClick={handleMinify}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
        >
          Minify JSON
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">Valid Formatted JSON</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-64">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
