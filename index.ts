export type GenderSection = 'men' | 'women';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface WorkerProfile {
  id: string;
  name: string;
  profession: string;
  category: string;
  gender: GenderSection;
  experienceYears: string;
  bio: string;
  imageUrl: string;
  phone: string;
  whatsapp?: string;
  facebook?: string;
  status: ApprovalStatus;
  createdAt: string;
  location?: string;
  rating?: number;
  completedJobs?: number;
}

export interface AdOffer {
  id: string;
  title: string;
  providerName: string;
  category: string;
  description: string;
  imageUrl: string;
  phone: string;
  whatsapp?: string;
  facebook?: string;
  priceText?: string;
  status: ApprovalStatus;
  createdAt: string;
  expiresAt?: string;
}

export type MainTab = 'men' | 'women' | 'ads' | 'admin' | 'static-page';

export type StaticPageKey = 'about' | 'mission' | 'privacy' | 'disclaimer';

export interface StaticPageContent {
  title: string;
  subtitle: string;
  content: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  iconName: string;
  count?: number;
}
