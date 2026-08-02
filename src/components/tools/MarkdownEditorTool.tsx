import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Copy, Check } from 'lucide-react';

export const MarkdownEditorTool: React.FC = () => {
  const { language } = useLanguage();
  const [markdown, setMarkdown] = useState(`# Welcome to AI Markdown Editor\n\n## Features\n- Real-time split preview\n- Clean typography\n- Instant HTML copy`);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Markdown Code</label>
          <textarea
            rows={10}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-indigo-400">Live Preview</label>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs h-64 overflow-y-auto whitespace-pre-line leading-relaxed">
            {markdown}
          </div>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied Markdown' : 'Copy Markdown Text'}</span>
      </button>
    </div>
  );
};
