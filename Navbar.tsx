import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Megaphone, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Moon,
  Sun
} from 'lucide-react';
import officialLogo from '../assets/images/ouenza_jobs_official_logo_1785674094617.jpg';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    openSubmissionModal, 
    workers, 
    ads,
    adminLoggedIn,
    darkMode,
    toggleDarkMode
  } = useApp();

  const menCount = workers.filter(w => w.gender === 'men' && w.status === 'approved').length;
  const womenCount = workers.filter(w => w.gender === 'women' && w.status === 'approved').length;
  const adsCount = ads.filter(a => a.status === 'approved').length;
  const totalPending = workers.filter(w => w.status === 'pending').length + ads.filter(a => a.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Banner for Ouenza Identity & Free Service */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300">منصة رقمية مجانية 100%:</span>
            <span>بدون أي رسوم اشتراك أو عمولات لأصحاب الحرف والمهن والخدمات</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>ونزة-تبسة-الجزائر</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('men')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/80 dark:border-slate-700/80 group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center p-0.5">
              <img 
                src={officialLogo} 
                alt="شعار ونزة جوبس الرسمي" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-950 dark:text-white">
                  ونزة
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-500">
                  جوبس
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                Ouenza Jobs • دليل الحرف والمهن
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Responsive Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('men')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'men'
                  ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-300 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>مهن الرجال</span>
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 font-semibold">
                {menCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('women')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'women'
                  ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-amber-300 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>مهن النساء</span>
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-semibold">
                {womenCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'ads'
                  ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-emerald-300 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Megaphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>إعلانات وعروض</span>
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 font-semibold">
                {adsCount}
              </span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5"
              title={darkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
              aria-label="التبديل بين الوضع الليلي والنهاري"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold hidden sm:inline">نهاري</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="text-xs font-bold hidden sm:inline">ليلي</span>
                </>
              )}
            </button>

            <button
              onClick={() => openSubmissionModal('profile', activeTab === 'women' ? 'women' : 'men')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">أضف مهنتك مجاناً</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                activeTab === 'admin' || adminLoggedIn
                  ? 'bg-blue-950 text-white border-blue-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="لوحة تحكم المدير"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="hidden sm:inline">الإدارة</span>
              {totalPending > 0 && (
                <span className="absolute -top-1.5 -left-1.5 bg-rose-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {totalPending}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 gap-1">
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'men'
                ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>مهن الرجال ({menCount})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('women')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'women'
                ? 'bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>مهن النساء ({womenCount})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ads'
                ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1">
              <Megaphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>إعلانات ({adsCount})</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
