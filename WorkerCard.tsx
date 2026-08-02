import React from 'react';
import { WorkerProfile } from '../types';
import { 
  PhoneCall, 
  MessageCircle, 
  Facebook, 
  MapPin, 
  Award, 
  Star, 
  ChevronLeft 
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';
import { useApp } from '../context/AppContext';

interface WorkerCardProps {
  worker: WorkerProfile;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { setSelectedWorker } = useApp();

  const categoryObj = CATEGORIES.find(c => c.id === worker.category);

  // Formatting phone number for WhatsApp link
  const getWhatsAppUrl = (phoneOrWa: string) => {
    const clean = phoneOrWa.replace(/\D/g, '');
    const intPhone = clean.startsWith('0') ? '213' + clean.slice(1) : clean;
    return `https://wa.me/${intPhone}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Card Header with Photo & Profession */}
      <div className="p-4 sm:p-5 pb-3 flex items-start gap-3.5 border-b border-slate-100 dark:border-slate-800">
        {/* Worker Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 shadow-sm">
          <img
            src={worker.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'}
            alt={worker.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80';
            }}
          />
          {worker.rating && (
            <div className="absolute bottom-1 right-1 bg-blue-900/90 text-amber-300 px-1.5 py-0.5 rounded-md text-[10px] font-black flex items-center gap-0.5 shadow-xs">
              <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
              <span>{worker.rating}</span>
            </div>
          )}
        </div>

        {/* Name & Profession */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="inline-block px-2 py-0.5 text-[11px] font-bold rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
              {categoryObj ? categoryObj.name : 'مهنة حرفية'}
            </span>
            {worker.experienceYears && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                <Award className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>{worker.experienceYears}</span>
              </span>
            )}
          </div>

          <h3 
            onClick={() => setSelectedWorker(worker)}
            className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate hover:text-blue-800 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {worker.name}
          </h3>

          <p className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-400 truncate mb-1">
            {worker.profession}
          </p>

          {worker.location && (
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
              <MapPin className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="truncate">{worker.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bio excerpt */}
      <div className="p-4 sm:p-5 py-3 flex-1">
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {worker.bio}
        </p>
      </div>

      {/* Action Buttons Strip - Required: Phone, WhatsApp, Facebook */}
      <div className="p-3.5 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          {/* 1. Phone Call */}
          <a
            href={`tel:${worker.phone}`}
            className="flex items-center justify-center gap-1 bg-blue-900 hover:bg-blue-800 text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
            title="اتصال هاتفي مباشر"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>اتصال</span>
          </a>

          {/* 2. WhatsApp */}
          {worker.whatsapp || worker.phone ? (
            <a
              href={getWhatsAppUrl(worker.whatsapp || worker.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              title="مراسلة عبر واتساب"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </a>
          ) : (
            <span className="flex items-center justify-center gap-1 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 py-2 px-2 rounded-xl text-xs font-bold cursor-not-allowed">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </span>
          )}

          {/* 3. Facebook */}
          {worker.facebook ? (
            <a
              href={worker.facebook}
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
              href={`https://www.facebook.com/search/top?q=${encodeURIComponent(worker.name + ' ونزة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 py-2 px-2 rounded-xl text-xs font-bold transition-all"
              title="بحث في فيسبوك"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>فيسبوك</span>
            </a>
          )}
        </div>

        {/* Full Profile button */}
        <button
          onClick={() => setSelectedWorker(worker)}
          className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors"
        >
          <span>عرض كامل الملف والتفاصيل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
