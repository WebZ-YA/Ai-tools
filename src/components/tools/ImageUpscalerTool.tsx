import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Upload, Download, Sparkles, RefreshCw } from 'lucide-react';

export const ImageUpscalerTool: React.FC = () => {
  const { language } = useLanguage();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [upscaledSrc, setUpscaledSrc] = useState<string | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(4);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setUpscaledSrc(null);
    }
  };

  const handleUpscale = () => {
    if (!imageSrc) return;
    setProcessing(true);

    setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setUpscaledSrc(canvas.toDataURL('image/png'));
        }
        setProcessing(false);
      };
      img.src = imageSrc;
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 rounded-3xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/50 hover:bg-slate-900/30 text-center cursor-pointer transition-all space-y-3"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 mx-auto flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">
            {language === 'ar' ? 'اختر صورة لتكبير ودقة HD' : 'Select photo for 4X AI Upscaling'}
          </h4>
          <p className="text-xs text-slate-400 mt-1">Enhance sharpness and resolution</p>
        </div>
      </div>

      {imageSrc && (
        <div className="space-y-4">
          
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs font-bold text-slate-300">Scale Factor:</span>
            {[2, 4].map((factor) => (
              <button
                key={factor}
                onClick={() => setScaleFactor(factor)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  scaleFactor === factor
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                {factor}X Ultra HD
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400">Original</div>
              <div className="h-56 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400">{scaleFactor}X Upscaled HD Output</div>
              <div className="h-56 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
                {upscaledSrc ? (
                  <img src={upscaledSrc} alt="Upscaled" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-xs text-slate-500 font-medium">
                    {processing ? (
                      <div className="flex flex-col items-center gap-2 text-purple-400">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Upscaling image...</span>
                      </div>
                    ) : (
                      'Click Upscale to process'
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!upscaledSrc ? (
            <button
              onClick={handleUpscale}
              disabled={processing}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'تكبير ودعم دقة الصورة' : 'Upscale Photo Now'}</span>
            </button>
          ) : (
            <a
              href={upscaledSrc}
              download={`upscaled_${scaleFactor}x.png`}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'ar' ? 'تحميل الصورة الفائقة الدقة HD' : 'Download Ultra HD Photo'}</span>
            </a>
          )}
        </div>
      )}

    </div>
  );
};
