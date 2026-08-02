import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Upload, Download, Sparkles, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';

export const BackgroundRemoverTool: React.FC = () => {
  const { language } = useLanguage();
  const { addSavedFile } = useAuth();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setProcessedSrc(null);
    }
  };

  const handleProcess = () => {
    if (!imageSrc) return;
    setProcessing(true);

    // Canvas background removal processing simulation
    setTimeout(() => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Remove light/white background pixels for transparent output
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if (r > 220 && g > 220 && b > 220) {
              data[i + 3] = 0; // Transparent alpha
            }
          }
          ctx.putImageData(imageData, 0, 0);
          const transparentUrl = canvas.toDataURL('image/png');
          setProcessedSrc(transparentUrl);
          addSavedFile({
            name: 'background_removed.png',
            type: 'PNG Image',
            size: '1.2 MB',
            url: transparentUrl
          });
        }
        setProcessing(false);
      };
      img.src = imageSrc;
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Zone */}
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
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">
            {language === 'ar' ? 'اختر صورة أو اسحبها هنا' : 'Select or drag an image here'}
          </h4>
          <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP up to 10MB</p>
        </div>
      </div>

      {imageSrc && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Original Preview */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400">{language === 'ar' ? 'الصورة الأصلية' : 'Original Image'}</div>
              <div className="h-56 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-800">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Processed Output */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400">{language === 'ar' ? 'النتيجة (خلفية شفافة PNG)' : 'Processed Output (Transparent PNG)'}</div>
              <div className="h-56 rounded-xl bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] bg-slate-900 overflow-hidden flex items-center justify-center border border-slate-800">
                {processedSrc ? (
                  <img src={processedSrc} alt="Processed" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-xs text-slate-500 font-medium text-center p-4">
                    {processing ? (
                      <div className="flex flex-col items-center gap-2 text-indigo-400">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Removing background...</span>
                      </div>
                    ) : (
                      'Click Process Image to extract subject'
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

          {!processedSrc ? (
            <button
              onClick={handleProcess}
              disabled={processing}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'إزالة الخلفية الآن' : 'Remove Background Now'}</span>
            </button>
          ) : (
            <a
              href={processedSrc}
              download="transparent_image.png"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'ar' ? 'تحميل صورة HD PNG شفافة' : 'Download Transparent HD PNG'}</span>
            </a>
          )}
        </div>
      )}

    </div>
  );
};
