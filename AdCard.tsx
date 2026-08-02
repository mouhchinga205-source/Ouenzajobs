import React from 'react';
import { AdOffer } from '../types';
import { 
  PhoneCall, 
  MessageCircle, 
  Facebook, 
  Tag, 
  Calendar, 
  Sparkles,
  ChevronLeft 
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import { useApp } from '../context/AppContext';

interface AdCardProps {
  ad: AdOffer;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { setSelectedAd } = useApp();

  const categoryObj = CATEGORIES.find(c => c.id === ad.category);

  const getWhatsAppUrl = (phoneOrWa: string) => {
    const clean = phoneOrWa.replace(/\D/g, '');
    const intPhone = clean.startsWith('0') ? '213' + clean.slice(1) : clean;
    return `https://wa.me/${intPhone}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Promotional Image Banner */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={ad.imageUrl || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80'}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Price/Discount Badge */}
        {ad.priceText && (
          <div className="absolute top-3 left-3 bg-amber-500 text-blue-950 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>{ad.priceText}</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-blue-900/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
          {categoryObj ? categoryObj.name : 'عرض خاص'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>نُشر في: {ad.createdAt}</span>
          {ad.expiresAt && (
            <span className="text-rose-600 font-bold ml-auto">ينتهي: {ad.expiresAt}</span>
          )}
        </div>

        <h3 
          onClick={() => setSelectedAd(ad)}
          className="text-base sm:text-lg font-black text-slate-900 line-clamp-2 mb-2 hover:text-blue-800 cursor-pointer transition-colors"
        >
          {ad.title}
        </h3>

        <p className="text-xs sm:text-sm font-bold text-blue-700 mb-2.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{ad.providerName}</span>
        </p>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
          {ad.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          <a
            href={`tel:${ad.phone}`}
            className="flex items-center justify-center gap-1 bg-blue-900 hover:bg-blue-800 text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
            title="اتصال هاتفي مباشر"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>اتصال</span>
          </a>

          {ad.whatsapp || ad.phone ? (
            <a
              href={getWhatsAppUrl(ad.whatsapp || ad.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              title="مراسلة عبر واتساب"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </a>
          ) : (
            <span className="flex items-center justify-center gap-1 bg-slate-200 text-slate-400 py-2 px-2 rounded-xl text-xs font-bold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </span>
          )}

          {ad.facebook ? (
            <a
              href={ad.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              title="صفحة الفيسبوك"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>فيسبوك</span>
            </a>
          ) : (
            <a
              href={`https://www.facebook.com/search/top?q=${encodeURIComponent(ad.providerName + ' ونزة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 py-2 px-2 rounded-xl text-xs font-bold transition-all"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>فيسبوك</span>
            </a>
          )}
        </div>

        <button
          onClick={() => setSelectedAd(ad)}
          className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 text-xs font-bold transition-colors"
        >
          <span>تفاصيل العرض والإعلان</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
