import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Heart, 
  MapPin, 
  Info, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  PlusCircle
} from 'lucide-react';
import officialLogo from '../assets/images/ouenza_jobs_official_logo_1785674094617.jpg';

export const Footer: React.FC = () => {
  const { openStaticPage, openSubmissionModal, setActiveTab } = useApp();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-950 text-white border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Intro */}
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => setActiveTab('men')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white shadow-md border border-slate-700 p-0.5 flex items-center justify-center">
                <img 
                  src={officialLogo} 
                  alt="شعار ونزة جوبس" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white">
                  ونزة
                </span>
                <span className="text-xl font-black text-amber-400">
                  جوبس
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              الفضاء الرقمي المجاني الأول الذي يجمع أصحاب وصاحبات الحرف والخدمات في ونزة-تبسة-الجزائر، لتسهيل التواصل المباشر دون رسوم أو عمولات.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>ونزة-تبسة-الجزائر</span>
            </div>
          </div>

          {/* Static Pages - Required by Section 4 */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>صفحات ومبادئ المنصة</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => openStaticPage('about')}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>من نحن (About Us)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openStaticPage('mission')}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>رسالتنا ورؤيتنا (Our Mission)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openStaticPage('privacy')}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>سياسة الخصوصية (Privacy Policy)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openStaticPage('disclaimer')}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>إخلاء المسؤولية (Disclaimer)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Sections Navigation */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>أقسام ونزة جوبس</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('men')}
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  قسم مهن الرجال (دليل الحرفيين)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('women')}
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  قسم مهن النساء (الحرفيات)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ads')}
                  className="text-slate-300 hover:text-amber-400 transition-colors"
                >
                  قسم إعلانات وعروض ونزة
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-slate-300 hover:text-amber-400 transition-colors font-bold"
                >
                  لوحة تحكم المدير (الإدارة)
                </button>
              </li>
            </ul>
          </div>

          {/* Free Join CTA */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>هل تقدم خدمة في ونزة؟</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              انضم مجاناً إلى دليل ونزة جوبس ليتعرف عليك جميع سكان ونزة وتصلك طلبات الاتصال مباشرة.
            </p>
            <button
              onClick={() => openSubmissionModal('profile', 'men')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-950 font-black py-2.5 px-4 rounded-xl text-xs shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>سجّل مهنتك الآن مجاناً</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} • منصة <strong>ونزة جوبس (Ouenza Jobs)</strong> — دليل المهن والحرف في ونزة
          </div>
          <div className="flex items-center gap-1">
            <span>صُنع بحب ومسؤولية لخدمة مجتمع</span>
            <span className="text-amber-400 font-bold">ونزة</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
