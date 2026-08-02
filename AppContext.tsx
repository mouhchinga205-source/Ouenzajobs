import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WorkerProfile, 
  AdOffer, 
  MainTab, 
  StaticPageKey, 
  StaticPageContent, 
  ApprovalStatus,
  GenderSection 
} from '../types';
import { INITIAL_WORKERS, INITIAL_ADS, INITIAL_STATIC_PAGES } from '../data/initialData';

interface AppContextType {
  // Theme & Appearance
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation & View State
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Data State
  workers: WorkerProfile[];
  ads: AdOffer[];
  staticPages: Record<StaticPageKey, StaticPageContent>;

  // Modals & Active Viewers
  submissionModalOpen: boolean;
  submissionType: 'profile' | 'ad';
  submissionGender: GenderSection;
  openSubmissionModal: (type: 'profile' | 'ad', gender?: GenderSection) => void;
  closeSubmissionModal: () => void;
  selectedWorker: WorkerProfile | null;
  setSelectedWorker: (worker: WorkerProfile | null) => void;
  selectedAd: AdOffer | null;
  setSelectedAd: (ad: AdOffer | null) => void;
  selectedStaticPage: StaticPageKey | null;
  openStaticPage: (page: StaticPageKey) => void;
  closeStaticPage: () => void;
  contactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  // Admin state & actions
  adminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  approveWorker: (id: string) => void;
  rejectWorker: (id: string) => void;
  deleteWorker: (id: string) => void;
  updateWorker: (id: string, updated: Partial<WorkerProfile>) => void;
  approveAd: (id: string) => void;
  rejectAd: (id: string) => void;
  deleteAd: (id: string) => void;
  updateAd: (id: string, updated: Partial<AdOffer>) => void;
  updateStaticPageContent: (key: StaticPageKey, updated: StaticPageContent) => void;

  // User Submission actions
  addWorkerProfile: (data: Omit<WorkerProfile, 'id' | 'status' | 'createdAt'>) => void;
  addAdOffer: (data: Omit<AdOffer, 'id' | 'status' | 'createdAt'>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const WORKERS_STORAGE_KEY = 'ouenza_jobs_workers_v1';
const ADS_STORAGE_KEY = 'ouenza_jobs_ads_v1';
const STATIC_PAGES_STORAGE_KEY = 'ouenza_jobs_static_pages_v1';
const ADMIN_SESSION_KEY = 'ouenza_jobs_admin_session_v1';
const DARK_MODE_KEY = 'ouenza_jobs_dark_mode_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_KEY, String(darkMode));
      const root = document.documentElement;
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const [activeTab, setActiveTabState] = useState<MainTab>('men');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load Workers from localStorage or Initial Data
  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    try {
      const saved = localStorage.getItem(WORKERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load workers from localStorage:', e);
    }
    return INITIAL_WORKERS;
  });

  // Load Ads from localStorage or Initial Data
  const [ads, setAds] = useState<AdOffer[]>(() => {
    try {
      const saved = localStorage.getItem(ADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load ads from localStorage:', e);
    }
    return INITIAL_ADS;
  });

  // Load Static Pages from localStorage or Initial Data
  const [staticPages, setStaticPages] = useState<Record<StaticPageKey, StaticPageContent>>(() => {
    try {
      const saved = localStorage.getItem(STATIC_PAGES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load static pages from localStorage:', e);
    }
    return INITIAL_STATIC_PAGES;
  });

  // Admin Session
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Modals state
  const [submissionModalOpen, setSubmissionModalOpen] = useState<boolean>(false);
  const [submissionType, setSubmissionType] = useState<'profile' | 'ad'>('profile');
  const [submissionGender, setSubmissionGender] = useState<GenderSection>('men');
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [selectedAd, setSelectedAd] = useState<AdOffer | null>(null);
  const [selectedStaticPage, setSelectedStaticPage] = useState<StaticPageKey | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(workers));
    } catch (e) {
      console.error('Error saving workers to localStorage:', e);
    }
  }, [workers]);

  useEffect(() => {
    try {
      localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(ads));
    } catch (e) {
      console.error('Error saving ads to localStorage:', e);
    }
  }, [ads]);

  useEffect(() => {
    try {
      localStorage.setItem(STATIC_PAGES_STORAGE_KEY, JSON.stringify(staticPages));
    } catch (e) {
      console.error('Error saving static pages to localStorage:', e);
    }
  }, [staticPages]);

  // Tab changer resets filter for clean UX
  const setActiveTab = (tab: MainTab) => {
    setActiveTabState(tab);
    setSearchQuery('');
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSubmissionModal = (type: 'profile' | 'ad', gender: GenderSection = 'men') => {
    setSubmissionType(type);
    setSubmissionGender(gender);
    setSubmissionModalOpen(true);
  };

  const closeSubmissionModal = () => {
    setSubmissionModalOpen(false);
  };

  const openStaticPage = (page: StaticPageKey) => {
    setSelectedStaticPage(page);
    setActiveTabState('static-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeStaticPage = () => {
    setSelectedStaticPage(null);
    setActiveTabState('men');
  };

  const openContactModal = () => {
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  // Admin Login
  const loginAdmin = (pass: string): boolean => {
    if (pass === 'admin123' || pass === 'ouenza2026') {
      setAdminLoggedIn(true);
      try {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminLoggedIn(false);
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Worker CRUD
  const approveWorker = (id: string) => {
    setWorkers(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'approved' as ApprovalStatus } : item))
    );
  };

  const rejectWorker = (id: string) => {
    setWorkers(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'rejected' as ApprovalStatus } : item))
    );
  };

  const deleteWorker = (id: string) => {
    setWorkers(prev => prev.filter(item => item.id !== id));
  };

  const updateWorker = (id: string, updated: Partial<WorkerProfile>) => {
    setWorkers(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  // Ads CRUD
  const approveAd = (id: string) => {
    setAds(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'approved' as ApprovalStatus } : item))
    );
  };

  const rejectAd = (id: string) => {
    setAds(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'rejected' as ApprovalStatus } : item))
    );
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(item => item.id !== id));
  };

  const updateAd = (id: string, updated: Partial<AdOffer>) => {
    setAds(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const updateStaticPageContent = (key: StaticPageKey, updated: StaticPageContent) => {
    setStaticPages(prev => ({
      ...prev,
      [key]: updated
    }));
  };

  // Add new Profile submission (starts as 'pending')
  const addWorkerProfile = (data: Omit<WorkerProfile, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'w-' + Date.now().toString(36);
    const newWorker: WorkerProfile = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWorkers(prev => [newWorker, ...prev]);
  };

  // Add new Ad submission (starts as 'pending')
  const addAdOffer = (data: Omit<AdOffer, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'ad-' + Date.now().toString(36);
    const newAd: AdOffer = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAds(prev => [newAd, ...prev]);
  };

  const resetAllData = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع البيانات إلى الحالة الافتراضية؟')) {
      setWorkers(INITIAL_WORKERS);
      setAds(INITIAL_ADS);
      setStaticPages(INITIAL_STATIC_PAGES);
      try {
        localStorage.removeItem(WORKERS_STORAGE_KEY);
        localStorage.removeItem(ADS_STORAGE_KEY);
        localStorage.removeItem(STATIC_PAGES_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        workers,
        ads,
        staticPages,
        submissionModalOpen,
        submissionType,
        submissionGender,
        openSubmissionModal,
        closeSubmissionModal,
        selectedWorker,
        setSelectedWorker,
        selectedAd,
        setSelectedAd,
        selectedStaticPage,
        openStaticPage,
        closeStaticPage,
        adminLoggedIn,
        loginAdmin,
        logoutAdmin,
        approveWorker,
        rejectWorker,
        deleteWorker,
        updateWorker,
        approveAd,
        rejectAd,
        deleteAd,
        updateAd,
        updateStaticPageContent,
        addWorkerProfile,
        addAdOffer,
        resetAllData,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
