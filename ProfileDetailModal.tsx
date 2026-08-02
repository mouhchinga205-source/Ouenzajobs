import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  PhoneCall, 
  MessageCircle, 
  Facebook, 
  MapPin, 
  Award, 
  Star, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export const ProfileDetailModal: React.FC = () => {
  const { selectedWorker, setSelectedWorker } = useApp();

  if (!selectedWorker) return null;

  const categoryObj = CATEGORIES.find(c => c.id === selectedWorker.category);

  const getWhatsAppUrl = (phoneOrWa: string) => {
    const clean = phoneOrWa.replace(/\D/g, '');
    const intPhone = clean.startsWith('0') ? '213' + clean.slice(1) : clean;
    return `https://wa.me/${intPhone}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-800 text-amber-300 text-xs font-bold">
              {categoryObj ? categoryObj.name : 'مهنة حرفية'}
            </span>
            <span className="text-xs bg-amber-400 text-blue-950 font-black px-2 py-0.5 rounded-full">
              حرفي معتمد
            </span>
          </div>

          <button
            onClick={() => setSelectedWorker(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right mb-6">
            <img
              src={selectedWorker.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'}
              alt={selectedWorker.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedWorker.name}
                </h3>
                {selectedWorker.rating && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{selectedWorker.rating}</span>
                  </span>
                )}
              </div>

              <p className="text-base font-bold text-blue-800 mb-2">
                {selectedWorker.profession}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600">
                {selectedWorker.experienceYears && (
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-bold">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>الخبرة: {selectedWorker.experienceYears}</span>
                  </span>
                )}
                {selectedWorker.location && (
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-bold">
                    <MapPin className="w-4 h-4 text-blue-700" />
                    <span>{selectedWorker.location}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bio Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-blue-700" />
              <span>نبذة عن الخدمات والخبرة المهنية</span>
            </h4>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {selectedWorker.bio}
            </p>
          </div>

          {/* Contact Actions Strip */}
          <h4 className="text-sm font-black text-slate-900 mb-3">
            تواصل مباشرة عبر الهاتف أو المنصات:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Phone */}
            <a
              href={`tel:${selectedWorker.phone}`}
              className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>اتصال هاتفي</span>
            </a>

            {/* 2. WhatsApp */}
            {selectedWorker.whatsapp || selectedWorker.phone ? (
              <a
                href={getWhatsAppUrl(selectedWorker.whatsapp || selectedWorker.phone)}
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

            {/* 3. Facebook */}
            {selectedWorker.facebook ? (
              <a
                href={selectedWorker.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Facebook className="w-4 h-4" />
                <span>صفحة فيسبوك</span>
              </a>
            ) : (
              <a
                href={`https://www.facebook.com/search/top?q=${encodeURIComponent(selectedWorker.name + ' ونزة')}`}
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
            تاريخ الإضافة: {selectedWorker.createdAt} • خدمة مجانية بدون وسيط
          </span>
          <button
            onClick={() => setSelectedWorker(null)}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
