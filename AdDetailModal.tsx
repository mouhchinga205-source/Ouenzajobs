import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  PhoneCall, 
  MessageCircle, 
  Facebook, 
  Tag, 
  Calendar, 
  Sparkles,
  Megaphone
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export const AdDetailModal: React.FC = () => {
  const { selectedAd, setSelectedAd } = useApp();

  if (!selectedAd) return null;

  const categoryObj = CATEGORIES.find(c => c.id === selectedAd.category);

  const getWhatsAppUrl = (phoneOrWa: string) => {
    const clean = phoneOrWa.replace(/\D/g, '');
    const intPhone = clean.startsWith('0') ? '213' + clean.slice(1) : clean;
    return `https://wa.me/${intPhone}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-100">
          <img
            src={selectedAd.imageUrl || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80'}
            alt={selectedAd.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {selectedAd.priceText && (
            <div className="absolute top-4 left-4 bg-amber-500 text-blue-950 font-black text-sm px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>{selectedAd.priceText}</span>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-blue-900/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-xl">
            {categoryObj ? categoryObj.name : 'إعلان ترويجي'}
          </div>

          <div className="absolute bottom-4 right-4 left-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{selectedAd.providerName}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black leading-tight">
              {selectedAd.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
            <span className="flex items-center gap-1 font-semibold">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>تاريخ النشر: {selectedAd.createdAt}</span>
            </span>
            {selectedAd.expiresAt && (
              <span className="font-bold text-rose-600">
                صالح حتى: {selectedAd.expiresAt}
              </span>
            )}
          </div>

          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Megaphone className="w-4 h-4 text-blue-700" />
            <span>تفاصيل العرض والمزايا</span>
          </h4>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium mb-6">
            {selectedAd.description}
          </p>

          {/* Contact Actions Strip */}
          <h4 className="text-sm font-black text-slate-900 mb-3">
            للاستفادة من هذا العرض، تواصل مع المعلن مباشرة:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${selectedAd.phone}`}
              className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>اتصال هاتفي</span>
            </a>

            {selectedAd.whatsapp || selectedAd.phone ? (
              <a
                href={getWhatsAppUrl(selectedAd.whatsapp || selectedAd.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب مباشر</span>
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 bg-slate-200 text-slate-400 py-3 px-4 rounded-2xl text-sm font-bold cursor-not-allowed">
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </span>
            )}

            {selectedAd.facebook ? (
              <a
                href={selectedAd.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Facebook className="w-4 h-4" />
                <span>صفحة فيسبوك</span>
              </a>
            ) : (
              <a
                href={`https://www.facebook.com/search/top?q=${encodeURIComponent(selectedAd.providerName + ' ونزة')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 py-3 px-4 rounded-2xl text-sm font-bold transition-all border border-slate-300"
              >
                <Facebook className="w-4 h-4" />
                <span>بحث فيسبوك</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            منصة ونزة جوبس • إعلان معتمد
          </span>
          <button
            onClick={() => setSelectedAd(null)}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
