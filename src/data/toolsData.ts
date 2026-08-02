import { Category, Tool } from '../types';

export const categoriesData: Category[] = [
  {
    id: 'ai-writing',
    nameEn: 'AI Writing & Articles',
    nameAr: 'أدوات التوليد والمقالات',
    descriptionEn: 'Generate SEO blog posts, summaries, emails, and social media copy with Gemini AI.',
    descriptionAr: 'توليد مقالات متوافقة مع SEO، ملخصات نصوص، ورسائل بريد إلكتروني بالذكاء الاصطناعي.',
    toolCount: 8
  },
  {
    id: 'ai-marketing',
    nameEn: 'AI Marketing & Ads',
    nameAr: 'التسويق والإعلانات الرقمية',
    descriptionEn: 'Create Facebook/Google ads copy, landing page headlines, and email sequences.',
    descriptionAr: 'صياغة إعلانات فيسبوك وجوجل، عناوين صفحات الهبوط، وحملات البريد التسويقي.',
    toolCount: 6
  },
  {
    id: 'image-tools',
    nameEn: 'Image & Media Studio',
    nameAr: 'معالجة وتعديل الصور',
    descriptionEn: 'Remove backgrounds, upscale resolution up to 4x, and compress PNG/JPG files.',
    descriptionAr: 'إزالة خلفيات الصور، تكبير ودقة HD، وضغط أحجام الصور بدون فقد الجودة.',
    toolCount: 5
  },
  {
    id: 'pdf-tools',
    nameEn: 'PDF & Document Tools',
    nameAr: 'أدوات المستندات والـ PDF',
    descriptionEn: 'Convert, edit, extract text, and compress PDF business documents.',
    descriptionAr: 'تحويل، تحرير، استخراج النصوص، وضغط ملفات الـ PDF بسرعة عالية.',
    toolCount: 4
  },
  {
    id: 'developer-tools',
    nameEn: 'Developer & Web Utilities',
    nameAr: 'أدوات المطورين والبرمجة',
    descriptionEn: 'Format JSON, Base64 encode/decode, generate UUIDs, and inspect API responses.',
    descriptionAr: 'تنسيق JSON، ترميز Base64، توليد معرفات UUID، وفحص البيانات البرمجية.',
    toolCount: 7
  },
  {
    id: 'text-utilities',
    nameEn: 'Text & Design Utilities',
    nameAr: 'أدوات النصوص والتصميم',
    descriptionEn: 'Generate QR codes, barcodes, color palettes, CSS gradients, and word counters.',
    descriptionAr: 'إنشاء كود QR، باركود، لوحات ألوان، تدرجات CSS، وحساب عدد الكلمات.',
    toolCount: 6
  }
];

export const toolsData: Tool[] = [
  // 1. Background Remover
  {
    id: 'remove-background',
    nameEn: 'AI Background Remover',
    nameAr: 'إزالة خلفية الصور الذكية',
    descriptionEn: 'Instantly isolate subjects and export clean transparent PNG files.',
    descriptionAr: 'عزل العناصر والمنتجات من الصور وتصدير خلفية شفافة PNG بنقرة واحدة.',
    categoryId: 'image-tools',
    isAi: false,
    popular: true,
    trending: true,
    usageCount: 28450,
    tags: ['image', 'png', 'background', 'transparent', 'design']
  },
  // 2. Image Upscaler
  {
    id: 'image-upscaler',
    nameEn: 'AI Image 4X Upscaler',
    nameAr: 'تكبير وتحسين جودة الصور 4X',
    descriptionEn: 'Enhance low-resolution photos with clear sharp details.',
    descriptionAr: 'رفع دقة وجودة الصور المنخفضة حتى 4 أضعاف مع الحفاظ على التفاصيل.',
    categoryId: 'image-tools',
    isAi: false,
    popular: true,
    usageCount: 19320,
    tags: ['image', 'upscale', 'hd', 'resolution', 'photo']
  },
  // 3. Image Compressor
  {
    id: 'image-compressor',
    nameEn: 'Smart Image Compressor',
    nameAr: 'ضاغط حجم الصور الذكي',
    descriptionEn: 'Reduce file sizes up to 80% without visible quality loss.',
    descriptionAr: 'تقليل حجم ملفات JPG و PNG حتى 80% لتسريع مواقع الإنترنت.',
    categoryId: 'image-tools',
    isAi: false,
    popular: false,
    usageCount: 14200,
    tags: ['image', 'compress', 'jpg', 'png', 'size']
  },

  // 4. QR Generator
  {
    id: 'qr-code-generator',
    nameEn: 'QR Code Generator',
    nameAr: 'مولد رموز الاستجابة السريعة QR',
    descriptionEn: 'Create custom QR codes for URLs, WiFi, contact cards, and text.',
    descriptionAr: 'إنشاء كود QR مخصص للروابط، شبكات الواي فاي، وبطاقات الأعمال.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: true,
    usageCount: 31200,
    tags: ['qr', 'code', 'barcode', 'generator', 'wifi']
  },
  // 5. Barcode Generator
  {
    id: 'barcode-generator',
    nameEn: 'Product Barcode Generator',
    nameAr: 'مولد الباركود التجاري',
    descriptionEn: 'Generate CODE128 and EAN barcodes for products and inventory.',
    descriptionAr: 'توليد باركود المنتجات والمخازن صيغ CODE128 و EAN بسهولة.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: false,
    usageCount: 8900,
    tags: ['barcode', 'code128', 'product', 'inventory']
  },
  // 6. Color Palette
  {
    id: 'color-palette-generator',
    nameEn: 'AI Color Palette Generator',
    nameAr: 'مولد لوحات الألوان المتناسقة',
    descriptionEn: 'Generate aesthetic color schemes with HEX & RGB codes for UI designers.',
    descriptionAr: 'توليد تناسقات ألوان احترافية لمصممي واجهات المستخدم والتطبيقات.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: true,
    usageCount: 16500,
    tags: ['color', 'palette', 'hex', 'rgb', 'design']
  },
  // 7. Gradient Generator
  {
    id: 'gradient-generator',
    nameEn: 'CSS Gradient Generator',
    nameAr: 'مولد التدرجات اللونية CSS',
    descriptionEn: 'Design radial and linear gradients and copy instant Tailwind / CSS code.',
    descriptionAr: 'تصميم تدرجات ألوان جذابة ونخ كود CSS / Tailwind مباشرة.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: false,
    usageCount: 12100,
    tags: ['css', 'gradient', 'tailwind', 'color', 'style']
  },

  // 8. JSON Formatter
  {
    id: 'json-formatter',
    nameEn: 'JSON Formatter & Validator',
    nameAr: 'منسق وفاحص ملفات JSON',
    descriptionEn: 'Pretty-print, minify, and validate JSON syntax errors instantly.',
    descriptionAr: 'تنسيق واختبار صحة أكواد JSON واكتشاف الأخطاء البرمجية.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: true,
    usageCount: 42100,
    tags: ['json', 'format', 'developer', 'code', 'validate']
  },
  // 9. Base64 Tool
  {
    id: 'base64-encoder',
    nameEn: 'Base64 Encoder & Decoder',
    nameAr: 'مكود ومفكك شفرة Base64',
    descriptionEn: 'Encode plain text and images to Base64 strings or decode back.',
    descriptionAr: 'تحويل النصوص والصور إلى نص Base64 ومعالجتها برمجياً.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: false,
    usageCount: 23100,
    tags: ['base64', 'encode', 'decode', 'developer', 'security']
  },
  // 10. Markdown Editor
  {
    id: 'markdown-editor',
    nameEn: 'Markdown Live Editor',
    nameAr: 'محرر ماركداون المباشر',
    descriptionEn: 'Write Markdown documentation with real-time split preview & HTML export.',
    descriptionAr: 'كتابة مستندات Markdown مع معاينة فورية وتصدير كود HTML.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: false,
    usageCount: 11400,
    tags: ['markdown', 'editor', 'html', 'docs', 'text']
  },
  // 11. Word Counter
  {
    id: 'word-counter',
    nameEn: 'Word & Character Counter',
    nameAr: 'عداد الكلمات والحروف',
    descriptionEn: 'Analyze sentence counts, reading speed, and keyword density.',
    descriptionAr: 'حساب عدد الكلمات، الحروف، الفقرات، وزمن القراءة المتوقع.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: false,
    usageCount: 18900,
    tags: ['words', 'counter', 'seo', 'reading', 'characters']
  },
  // 12. Password Generator
  {
    id: 'password-generator',
    nameEn: 'Secure Password Generator',
    nameAr: 'مولد كلمة السر المعقدة والآمنة',
    descriptionEn: 'Generate randomized cryptographic passwords with custom strength settings.',
    descriptionAr: 'توليد كلمات سر عشوائية فائقة الحماية ومقاومة للاختراق.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: true,
    usageCount: 25600,
    tags: ['password', 'security', 'crypto', 'generator']
  },
  // 13. UUID Generator
  {
    id: 'uuid-generator',
    nameEn: 'UUID v4 Generator',
    nameAr: 'مولد المعرفات الفريدة UUID v4',
    descriptionEn: 'Generate bulk unique v4 GUID identifiers for database schemas.',
    descriptionAr: 'توليد معرفات عشوائية فريدة لقواعد البيانات والأنظمة.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: false,
    usageCount: 17800,
    tags: ['uuid', 'guid', 'database', 'developer', 'v4']
  },
  // 14. Lorem Ipsum
  {
    id: 'lorem-ipsum-generator',
    nameEn: 'Lorem Ipsum Text Generator',
    nameAr: 'مولد النصوص المؤقتة لوريم إيبسوم',
    descriptionEn: 'Generate dummy placeholder paragraphs in English and Arabic.',
    descriptionAr: 'توليد فقرات نصوص تجريبية للمصممين باللغتين العربية والإنجليزية.',
    categoryId: 'text-utilities',
    isAi: false,
    popular: false,
    usageCount: 13200,
    tags: ['lorem', 'ipsum', 'text', 'dummy', 'placeholder']
  },
  // 15. Text Compare
  {
    id: 'text-compare',
    nameEn: 'Text Diff & Compare Tool',
    nameAr: 'أداة مقارنة وتدقيق الاختلافات النصية',
    descriptionEn: 'Compare two text blocks line-by-line to highlight code differences.',
    descriptionAr: 'مقارنة نصين أو كودين برمجين وتحديد التغييرات والاختلافات بوضوح.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: false,
    usageCount: 9400,
    tags: ['compare', 'diff', 'text', 'code', 'git']
  },
  // 16. Case Converter
  {
    id: 'case-converter',
    nameEn: 'Text Case Converter',
    nameAr: 'محول حالة الأحرف الإنجليزية',
    descriptionEn: 'Convert uppercase, lowercase, camelCase, snake_case, and Title Case.',
    descriptionAr: 'تحويل حالة الحروف إلى UPPERCASE, camelCase, snake_case وغيرها.',
    categoryId: 'developer-tools',
    isAi: false,
    popular: false,
    usageCount: 10600,
    tags: ['case', 'converter', 'camelcase', 'snakecase', 'text']
  },

  // AI Tools (Gemini Powered)
  {
    id: 'ai-blog-writer',
    nameEn: 'AI Blog Article Generator',
    nameAr: 'مساعد كتابة المقالات بالذكاء الاصطناعي',
    descriptionEn: 'Generate full length SEO-optimized blog posts with headlines and outlines.',
    descriptionAr: 'كتابة مقالات متكاملة ومتوافقة مع محركات البحث SEO خلال ثوانٍ.',
    categoryId: 'ai-writing',
    isAi: true,
    isPro: true,
    popular: true,
    trending: true,
    usageCount: 52100,
    tags: ['ai', 'blog', 'writer', 'seo', 'gemini'],
    systemPrompt: 'You are an expert SEO content creator. Generate a structured, detailed blog article in the requested language with headings (H2, H3), intro, bullet points, and conclusion.',
    inputs: [
      { id: 'topic', labelEn: 'Article Topic', labelAr: 'موضوع المقال', type: 'text', placeholderEn: 'e.g., How to start an online store in 2026', placeholderAr: 'مثال: كيفية إنشاء متجر إلكتروني في 2026' },
      { id: 'keywords', labelEn: 'Target Keywords', labelAr: 'الكلمات المفتاحية المستهدفة', type: 'text', placeholderEn: 'e.g., e-commerce, Shopify, sales', placeholderAr: 'مثال: متجر إلكتروني، مبيعات، تجارة' },
      { id: 'tone', labelEn: 'Tone of Voice', labelAr: 'نبرة الكتابة', type: 'select', options: [
        { value: 'professional', labelEn: 'Professional & Authoritative', labelAr: 'احترافي وموثوق' },
        { value: 'engaging', labelEn: 'Friendly & Casual', labelAr: 'ودود وجذاب' },
        { value: 'persuasive', labelEn: 'Persuasive Sales Tone', labelAr: 'إقناعي ومبيعات' }
      ]}
    ]
  },
  {
    id: 'ai-facebook-ad',
    nameEn: 'AI Social Media Ad Writer',
    nameAr: 'كاتب إعلانات شبكات التواصل الاجتماعي',
    descriptionEn: 'Craft high-converting Facebook, Instagram, and TikTok ad copy with hook lines.',
    descriptionAr: 'صياغة نصوص إعلانية جذابة للفيسبوك وانستغرام مع عناوين خطافة.',
    categoryId: 'ai-marketing',
    isAi: true,
    isPro: true,
    popular: true,
    usageCount: 38900,
    tags: ['ai', 'ads', 'facebook', 'marketing', 'copywriting'],
    systemPrompt: 'You are a high-conversion performance marketer. Write 3 compelling ad copy variations including primary text, catchy headline, and call to action.',
    inputs: [
      { id: 'product', labelEn: 'Product or Service Name', labelAr: 'اسم المنتج أو الخدمة', type: 'text', placeholderEn: 'e.g., UltraFit Smartwatch', placeholderAr: 'مثال: ساعة ذكية رياضية' },
      { id: 'audience', labelEn: 'Target Audience', labelAr: 'الجمهور المستهدف', type: 'text', placeholderEn: 'e.g., Fitness enthusiasts aged 20-35', placeholderAr: 'مثال: المهتمون بالرياضة والياقة' }
    ]
  },
  {
    id: 'ai-email-writer',
    nameEn: 'AI Sales Email Sequence Generator',
    nameAr: 'مولد حملات البريد الإلكتروني التسويقية',
    descriptionEn: 'Draft cold outreach emails, follow-ups, and newsletter subject lines.',
    descriptionAr: 'كتابة رسائل بريد تسويقية واحترافية للعملاء مع عناوين ذات نسبة فتح عالية.',
    categoryId: 'ai-writing',
    isAi: true,
    popular: false,
    usageCount: 27400,
    tags: ['ai', 'email', 'sales', 'cold-email', 'outreach'],
    systemPrompt: 'You are a professional email copywriter. Write a persuasive cold outreach email with a catchy subject line and clear call to action.',
    inputs: [
      { id: 'goal', labelEn: 'Email Goal', labelAr: 'هدف الرسالة', type: 'text', placeholderEn: 'e.g., Book a demo call for SaaS software', placeholderAr: 'مثال: حجز موعد استشارة لبرنامج' }
    ]
  },
  {
    id: 'ai-code-assistant',
    nameEn: 'AI Code Refactor & Bug Fixer',
    nameAr: 'مساعد إصلاح وتطوير الأكواد البرمجية',
    descriptionEn: 'Explain code bugs, refactor for performance, and convert between languages.',
    descriptionAr: 'اكتشاف الأخطاء البرمجية، تحسين سرعة الكود، والتحويل بين لغات البرمجة.',
    categoryId: 'developer-tools',
    isAi: true,
    isPro: true,
    popular: true,
    usageCount: 49800,
    tags: ['ai', 'code', 'developer', 'react', 'python', 'bug'],
    systemPrompt: 'You are a senior software engineer. Analyze the provided code snippet, identify bugs or bottlenecks, provide optimized corrected code, and explain changes clearly.',
    inputs: [
      { id: 'codeSnippet', labelEn: 'Paste Code Snippet', labelAr: 'لصق الكود البرمجي', type: 'textarea', placeholderEn: 'Paste JavaScript, Python, PHP code here...', placeholderAr: 'ألصق كود جافاسكريبت، بايثون، أو غيره هنا...' }
    ]
  }
];
