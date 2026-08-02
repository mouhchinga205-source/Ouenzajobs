import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Info, 
  BookOpen, 
  AlertTriangle, 
  Edit3, 
  Save 
} from 'lucide-react';
import { StaticPageKey } from '../types';

export const StaticPageModal: React.FC = () => {
  const { 
    selectedStaticPage, 
    closeStaticPage, 
    staticPages, 
    adminLoggedIn, 
    updateStaticPageContent 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editContent, setEditContent] = useState('');

  if (!selectedStaticPage) return null;

  const currentPage = staticPages[selectedStaticPage];

  const handleStartEdit = () => {
    setEditTitle(currentPage.title);
    setEditSubtitle(currentPage.subtitle);
    setEditContent(currentPage.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateStaticPageContent(selectedStaticPage, {
      title: editTitle,
      subtitle: editSubtitle,
      content: editContent
    });
    setIsEditing(false);
  };

  const getPageIcon = (key: StaticPageKey) => {
    switch (key) {
      case 'about':
        return <Info className="w-6 h-6 text-blue-400" />;
      case 'mission':
        return <BookOpen className="w-6 h-6 text-amber-400" />;
      case 'privacy':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'disclaimer':
        return <AlertTriangle className="w-6 h-6 text-rose-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              {getPageIcon(selectedStaticPage)}
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black">
                {isEditing ? 'تعديل محتوى الصفحة (وضع المدير)' : currentPage.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-300 font-medium">
                {isEditing ? 'تغيير النصوص وتحديثها فورياً' : currentPage.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminLoggedIn && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-blue-950 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
                title="تعديل هذا المحتوى من طرف المدير"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>
            )}

            <button
              onClick={() => { setIsEditing(false); closeStaticPage(); }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الصفحة</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الفرعي</label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص الصفحة (يمكنك استخدام فقرات ونقاط)</label>
                <textarea
                  rows={10}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  إلغاء التعديل
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {currentPage.content}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ونزة جوبس • الفضاء الرقمي المجاني لحرفيي ومهنيي ونزة
          </span>
          <button
            onClick={() => { setIsEditing(false); closeStaticPage(); }}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
