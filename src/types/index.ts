export type CategoryId =
  | 'ai-writing'
  | 'ai-marketing'
  | 'image-tools'
  | 'pdf-tools'
  | 'developer-tools'
  | 'text-utilities'
  | 'chat-assistants';

export interface Category {
  id: CategoryId;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  toolCount: number;
}

export interface Tool {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  categoryId: CategoryId;
  isAi: boolean;
  isPro?: boolean;
  popular?: boolean;
  trending?: boolean;
  usageCount: number;
  tags: string[];
  systemPrompt?: string;
  inputs?: {
    id: string;
    labelEn: string;
    labelAr: string;
    type: 'text' | 'textarea' | 'select' | 'number';
    placeholderEn?: string;
    placeholderAr?: string;
    options?: { value: string; labelEn: string; labelAr: string }[];
  }[];
}

export type Role = 'user' | 'pro' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  plan: 'Free' | 'Pro' | 'Enterprise';
  creditsUsed: number;
  creditsLimit: number;
  apiKey?: string;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  input: string;
  output: string;
  timestamp: string;
}

export interface SavedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  uses: number;
  maxUses: number;
  active: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}
