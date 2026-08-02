import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  Users, 
  UserCheck, 
  Megaphone,
  PlusCircle
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export const HeroBanner: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    openSubmissionModal,
    workers,
    ads
  } = useApp();

  const menCount = workers.filter(w => w.gender === 'men' && w.status === 'approved').length;
  const womenCount = workers.filter(w => w.gender === 'women' && w.status === 'approved').length;
  const adsCount = ads.filter(a => a.status === 'approved').length;

  const getSectionHeader = () => {
    switch (activeTab) {
      case 'men':
        return {
          title: 'دليل مهن وحرف الرجال في ونزة-تبسة-الجزائر',
          badge: 'قسم مهن الرجال',
          description: 'تصفح نخبة الحرفيين والتقنيين المعتمدين في ونزة-تبسة-الجزائر وتواصل معهم مباشرة عبر الهاتف أو واتساب أو فيسبوك دون أي وسيط.',
          icon: <Users className="w-5 h-5 text-blue-300" />
        };
      case 'women':
        return {
          title: 'دليل مهن النساء (الحرفيات) في ونزة-تبسة-الجزائر',
          badge: 'قسم مهن النساء (الحرفيات)',
          description: 'دعم وتشجيع الحرفيات المنزليات (خياطة، حلويات، تجميل، تعليم، تصاميم) مع الحفاظ الكامل على الخصوصية والسهولة في التواصل.',
          icon: <UserCheck className="w-5 h-5 text-amber-300" />
        };
      case 'ads':
        return {
          title: 'قسم الإعلانات والعروض الترويجية الحصرية',
          badge: 'إعلانات وعروض ونزة',
          description: 'اكتشف أحدث العروض والخصومات والخدمات الجديدة في ونزة-تبسة-الجزائر أو انشر إعلانك التجاري مجاناً للجمهور.',
          icon: <Megaphone className="w-5 h-5 text-emerald-300" />
        };
      default:
        return {
          title: 'منصة ونزة جوبس (Ouenza Jobs)',
          badge: 'دليل شامل مجاني',
          description: 'الفضاء الرقمي الأول الذي يجمع أصحاب الحرف والمهن والخدمات في ونزة-تبسة-الجزائر.',
          icon: <CheckCircle2 className="w-5 h-5 text-amber-300" />
        };
    }
  };

  const header = getSectionHeader();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white py-10 sm:py-14 px-4 border-b border-blue-800 shadow-lg">
      {/* Subtle decorative background circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-800/80 border border-blue-600/60 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            {header.icon}
            <span>{header.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-200">خدمة مجانية لمدينة ونزة</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            {header.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {header.description}
          </p>

          {/* Quick Tab Switcher inside Hero */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab('men')}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'men'
                  ? 'bg-amber-500 text-blue-950 shadow-md scale-105 font-black'
                  : 'bg-blue-900/80 hover:bg-blue-800 text-slate-200 border border-blue-700/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>مهن الرجال</span>
              <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded-full">{menCount}</span>
            </button>

            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'women'
                  ? 'bg-amber-500 text-blue-950 shadow-md scale-105 font-black'
                  : 'bg-blue-900/80 hover:bg-blue-800 text-slate-200 border border-blue-700/60'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>مهن النساء</span>
              <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded-full">{womenCount}</span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                activeTab === 'ads'
                  ? 'bg-amber-500 text-blue-950 shadow-md scale-105 font-black'
                  : 'bg-blue-900/80 hover:bg-blue-800 text-slate-200 border border-blue-700/60'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>إعلانات وعروض</span>
              <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded-full">{adsCount}</span>
            </button>
          </div>

          {/* Large Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'men'
                    ? 'ابحث باسم الحرفي، المهنة (مثلاً: كهربائي، سباك، نجار)...'
                    : activeTab === 'women'
                    ? 'ابحثي باسم الحرفية، الخدمة (مثلاً: خياطة، حلويات، تجميل)...'
                    : 'ابحث في الإعلانات والعروض، اسم الورشة، نوع الخدمة...'
                }
                className="w-full bg-white text-slate-900 rounded-2xl py-3.5 pr-12 pl-4 text-sm sm:text-base font-semibold placeholder:text-slate-400 shadow-xl border-2 border-transparent focus:border-amber-400 focus:outline-hidden transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-lg font-bold transition-colors"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto pt-2">
          {CATEGORIES.slice(0, 9).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-blue-950 border-amber-300 shadow-md font-black'
                  : 'bg-blue-900/60 hover:bg-blue-800 text-slate-300 border-blue-700/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Action strip: Add profile button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openSubmissionModal('profile', activeTab === 'women' ? 'women' : 'men')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-950 font-black px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
          >
            <PlusCircle className="w-5 h-5" />
            <span>سجّل ملفك الحرفي أو مهنتك مجاناً الآن</span>
          </button>

          <button
            onClick={() => openSubmissionModal('ad', 'men')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white border border-blue-600 font-bold px-5 py-3 rounded-xl transition-all text-sm sm:text-base"
          >
            <Megaphone className="w-5 h-5 text-amber-400" />
            <span>انشر إعلاناً أو عرضاً ترويجياً مجاناً</span>
          </button>
        </div>
      </div>
    </section>
  );
};
