import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WorkerCard } from './WorkerCard';
import { AdCard } from './AdCard';
import { 
  Search, 
  Filter, 
  Users, 
  UserCheck, 
  Megaphone, 
  PlusCircle, 
  RefreshCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CATEGORIES, MEN_CATEGORIES, WOMEN_CATEGORIES } from '../data/initialData';
import communityHeroImg from '../assets/images/ouenza_community_hero_1785671480689.jpg';

export const DirectoryView: React.FC = () => {
  const { 
    activeTab, 
    workers, 
    ads, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    openSubmissionModal
  } = useApp();

  // Reset category filter to 'all' whenever tab switches
  useEffect(() => {
    setSelectedCategory('all');
  }, [activeTab, setSelectedCategory]);

  const getDisplayCategories = () => {
    if (activeTab === 'men') return MEN_CATEGORIES;
    if (activeTab === 'women') return WOMEN_CATEGORIES;
    return CATEGORIES;
  };

  // Filter approved items only for public view
  const approvedMen = workers.filter(w => w.gender === 'men' && w.status === 'approved');
  const approvedWomen = workers.filter(w => w.gender === 'women' && w.status === 'approved');
  const approvedAds = ads.filter(a => a.status === 'approved');

  // Apply search & category filter
  const filteredMen = approvedMen.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredWomen = approvedWomen.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredAds = approvedAds.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getActiveCount = () => {
    if (activeTab === 'men') return filteredMen.length;
    if (activeTab === 'women') return filteredWomen.length;
    return filteredAds.length;
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Community Hero with Frameless Backgroundless Cards Overlay - Text over image */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-10 min-h-[350px] flex items-center justify-center">
        {/* Background Photo of Men and Women Artisans Working Together */}
        <div className="absolute inset-0">
          <img 
            src={communityHeroImg} 
            alt="حرفيون وحرفيات ونزة-تبسة-الجزائر" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay for clear contrast without harsh boxes */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/80 to-blue-900/70" />
        </div>

        {/* Frameless & Backgroundless Content Cards Over Photo */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-5xl mx-auto text-white w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Main Text Card - No border, No background (بدون حواف وبدون خلفية) */}
            <div className="flex-1 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>دليل ونزة-تبسة-الجزائر</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white drop-shadow-sm">
                ملتقى أصحاب المهن والخدمات في <span className="text-amber-400">مدينة الونزة</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed drop-shadow-xs max-w-3xl">
                منصة Ouenza Jobs هي منصة مجانية تجمع مقدمي الخدمات في مدينة الونزة في مكان واحد، مما يسهّل على المستخدمين العثور على الخدمة المناسبة، استعراض نماذج من الأعمال المنجزة، والتواصل المباشر مع مقدم الخدمة عبر الهاتف أو واتساب بكل سرعة وسهولة.
              </p>
            </div>

            {/* Frameless Floating Badges Over Image without background borders */}
            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs text-white">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">تواصل مباشر وسريع</h4>
                  <p className="text-xs text-slate-200">هاتف وواتساب دون أي وسيط</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs text-white">
                <div className="w-10 h-10 rounded-xl bg-emerald-400 text-blue-950 flex items-center justify-center font-black shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">مجانية 100% للجميع</h4>
                  <p className="text-xs text-slate-200">بدون عمولة أو رسوم اشتراك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Filter & Search Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-300 border border-blue-100 dark:border-slate-700">
              {activeTab === 'men' && <Users className="w-5 h-5" />}
              {activeTab === 'women' && <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {activeTab === 'ads' && <Megaphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {activeTab === 'men' && 'قائمة أصحاب الحرف والمهن (رجال)'}
                {activeTab === 'women' && 'قائمة مهن النساء (الحرفيات)'}
                {activeTab === 'ads' && 'قائمة العروض والإعلانات الترويجية'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                تم العثور على <span className="font-bold text-blue-900 dark:text-amber-400">{getActiveCount()}</span> نتيجة معتمدة وموثوقة
              </p>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => openSubmissionModal(activeTab === 'ads' ? 'ad' : 'profile', activeTab === 'women' ? 'women' : 'men')}
            className="self-start md:self-center flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>
              {activeTab === 'ads' ? 'أضف إعلاناً أو عرضاً جديداً' : 'سجل ملفك المهني هنا مجاناً'}
            </span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          <span className="flex items-center gap-1 text-xs font-bold text-slate-400 shrink-0 ml-1">
            <Filter className="w-3.5 h-3.5" />
            <span>تصنيف:</span>
          </span>
          {getDisplayCategories().map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-blue-900 dark:bg-blue-600 text-white border-blue-900 dark:border-blue-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {activeTab === 'men' && (
        <>
          {filteredMen.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMen.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="لم يتم العثور على حرفيين بهذا البحث أو التصنيف" 
              subtitle="جرب البحث بكلمة أخرى أو تصفح جميع المهن، أو كن أول حرفي يسجل في هذا التخصص مجاناً!"
              onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              onAdd={() => openSubmissionModal('profile', 'men')}
            />
          )}
        </>
      )}

      {activeTab === 'women' && (
        <>
          {filteredWomen.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWomen.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="لم يتم العثور على حرفيات في هذا التصنيف حالياً" 
              subtitle="جربي تغيير الفلتر أو تسجيل ملفك المهني الآن ليتعرف عليك سكان ونزة."
              onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              onAdd={() => openSubmissionModal('profile', 'women')}
            />
          )}
        </>
      )}

      {activeTab === 'ads' && (
        <>
          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="لا توجد إعلانات عروض مطابقة للبحث حالياً" 
              subtitle="يمكنك إضافة إعلانك التجاري أو عرض التخفيض الخاص بك الآن مجاناً ليصل لجميع زوار المنصة."
              onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              onAdd={() => openSubmissionModal('ad', 'men')}
            />
          )}
        </>
      )}

      {/* Bottom info notice about free service and review system */}
      <div className="mt-12 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200">
              هل أنت صاحب حرفة أو خدمة في ونزة-تبسة-الجزائر؟
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              منصتنا مجانية تماماً وبدون أي رسوم. سجل ملفك الشخصي أو إعلانك الآن، وستتم مراجعته ونشره في أقرب وقت.
            </p>
          </div>
        </div>

        <button
          onClick={() => openSubmissionModal('profile', activeTab === 'women' ? 'women' : 'men')}
          className="w-full sm:w-auto shrink-0 bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-colors"
        >
          أضف ملفك المهني الآن
        </button>
      </div>
    </section>
  );
};

interface EmptyStateProps {
  title: string;
  subtitle: string;
  onReset: () => void;
  onAdd: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, onReset, onAdd }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center max-w-xl mx-auto my-6 transition-colors">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto mb-4">
      <AlertCircle className="w-7 h-7" />
    </div>
    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{subtitle}</p>
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
      >
        <RefreshCcw className="w-3.5 h-3.5" />
        <span>عرض كل النتائج</span>
      </button>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 text-white text-xs font-bold transition-colors"
      >
        <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
        <span>إضافة جديد مجاناً</span>
      </button>
    </div>
  </div>
);
