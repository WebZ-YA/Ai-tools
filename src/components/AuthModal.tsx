import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Mail, Lock, User as UserIcon, LogIn, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    loginWithGoogle, 
    loginWithEmail, 
    signupWithEmail, 
    authError, 
    clearAuthError,
    isFirebaseConnected
  } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (mode === 'login') {
      await loginWithEmail(email, password);
    } else {
      await signupWithEmail(email, password, name);
    }
    setSubmitting(false);
  };

  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => { clearAuthError(); setShowAuthModal(false); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          <h2 className="text-xl font-black text-white">
            {mode === 'login' 
              ? (isAr ? 'تسجيل الدخول إلى حسابك' : 'Sign In to Your Account') 
              : (isAr ? 'إنشاء حساب جديد' : 'Create New Account')}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {isAr 
              ? 'احفظ نتائج أدواتك، مفضلاتك، وملفاتك في قاعدة البيانات الحقيقية' 
              : 'Save tool outputs, history, and files directly in your live Firestore database'}
          </p>
        </div>

        {/* Error Alert */}
        {authError && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-white font-bold text-xs flex items-center justify-center gap-3 transition-all hover:bg-slate-800/80"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{isAr ? 'المتابعة باستخدام Google' : 'Continue with Google'}</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full"></div>
          <span className="bg-slate-900 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 absolute">
            {isAr ? 'أو بالبريد الإلكتروني' : 'Or with Email'}
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                {isAr ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'أدخل اسمك' : 'Enter your name'}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              {isAr ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? (
              <span className="animate-pulse">{isAr ? 'جاري المعالجة...' : 'Processing...'}</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>
                  {mode === 'login' 
                    ? (isAr ? 'تسجيل الدخول' : 'Sign In') 
                    : (isAr ? 'إنشاء الحساب' : 'Create Account')}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              clearAuthError();
              setMode(mode === 'login' ? 'signup' : 'login');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline"
          >
            {mode === 'login' 
              ? (isAr ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign Up") 
              : (isAr ? 'لديك حساب بالفعل؟ سجل الدخول' : 'Already have an account? Sign In')}
          </button>
        </div>

        {/* Firebase Connected Indicator Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-semibold pt-2 border-t border-slate-800/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAr ? 'متصل بقاعدة بيانات Firebase Firestore الحقيقية' : 'Connected to Live Firebase Firestore'}</span>
        </div>

      </div>
    </div>
  );
};
