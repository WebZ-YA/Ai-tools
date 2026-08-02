import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SeoHeadProps {
  activeTab: string;
}

const DOMAIN_URL = 'https://ai-tools-seven-black.vercel.app';

export const SeoHead: React.FC<SeoHeadProps> = ({ activeTab }) => {
  const { language } = useLanguage();

  useEffect(() => {
    let title = language === 'ar' 
      ? 'أدوات الذكاء الاصطناعي للأعمال | AI Business Toolkit'
      : 'AI Business Toolkit - 35+ Instant AI & Productivity Tools';

    let description = language === 'ar'
      ? 'منصة متكاملة تضم أكثر من 35 أداة ذكاء اصطناعي وأتمتة للأعمال، كتابة المقالات، معالجة الصور، صياغة الإعلانات، وتحليل البيانات.'
      : 'Complete suite of 35+ AI and business productivity tools for content generation, image processing, marketing, and data analytics.';

    let pageUrl = `${DOMAIN_URL}/#${activeTab}`;

    if (activeTab === 'tools') {
      title = language === 'ar' ? 'مكتبة الأدوات الذكية (35+ أداة) | AI Business Toolkit' : 'AI Tools Library (35+ Tools) | AI Business Toolkit';
      description = language === 'ar' ? 'تصفح مكتبة أدوات الذكاء الاصطناعي الكاملة لإنشاء المحتوى والأتمتة والتسويق.' : 'Explore 35+ AI-powered business tools for automated text, image editing, and workflows.';
    } else if (activeTab === 'pricing') {
      title = language === 'ar' ? 'خطط الأسعار والاشتراكات | AI Business Toolkit' : 'Pricing & Subscription Plans | AI Business Toolkit';
      description = language === 'ar' ? 'اختر الخطة المناسبة لأعمالك مع إمكانية الوصول غير المحدود لجميع الأدوات الذكية.' : 'Flexible monthly and yearly subscription plans with full API & tools access.';
    } else if (activeTab === 'blog') {
      title = language === 'ar' ? 'مدونة الذكاء الاصطناعي والأتمتة | AI Business Toolkit' : 'AI & SaaS Insights Blog | AI Business Toolkit';
      description = language === 'ar' ? 'أحدث المقالات والنصائح في أتمتة الأعمال والذكاء الاصطناعي لعام 2026.' : 'Latest articles, strategies, and guides on AI business automation.';
    } else if (activeTab === 'dashboard') {
      title = language === 'ar' ? 'لوحة التحكم السحابية | AI Business Toolkit' : 'User Cloud Dashboard | AI Business Toolkit';
    } else if (activeTab === 'admin') {
      title = language === 'ar' ? 'إدارة النظام | AI Business Toolkit' : 'System Administration | AI Business Toolkit';
    }

    document.title = title;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', pageUrl);

    // Update Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', pageUrl);

  }, [activeTab, language]);

  return null;
};
