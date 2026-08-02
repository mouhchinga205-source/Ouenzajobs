import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Info, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle, 
  Edit3, 
  Save, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { StaticPageKey } from '../types';

export const StaticPageView: React.FC = () => {
  const { 
    selectedStaticPage, 
    closeStaticPage, 
    staticPages, 
    adminLoggedIn, 
    updateStaticPageContent,
    setActiveTab 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const activePageKey: StaticPageKey = selectedStaticPage || 'about';
  const currentPage = staticPages[activePageKey];

  const handleStartEdit = () => {
    setEditTitle(currentPage.title);
    setEditSubtitle(currentPage.subtitle);
    setEditContent(currentPage.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateStaticPageContent(activePageKey, {
      title: editTitle,
      subtitle: editSubtitle,
      content: editContent
    });
    setIsEditing(false);
  };

  const getPageIcon = (key: StaticPageKey) => {
    switch (key) {
      case 'about':
        return <Info className="w-8 h-8 text-blue-400" />;
      case 'mission':
        return <BookOpen className="w-8 h-8 text-amber-400" />;
      case 'privacy':
        return <ShieldCheck className="w-8 h-8 text-emerald-400" />;
      case 'disclaimer':
        return <AlertTriangle className="w-8 h-8 text-rose-400" />;
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[70vh]">
      {/* Back to Home Link */}
      <button
        onClick={() => { closeStaticPage(); setActiveTab('men'); }}
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 mb-6 group transition-colors"
      >
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        <span>العودة إلى الصفحة الرئيسية لدليل ونزة جوبس</span>
      </button>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              {getPageIcon(activePageKey)}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-amber-300 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>صفحة رسمية • ونزة جوبس</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">
                {isEditing ? 'تعديل نص الصفحة (خاص بالمدير)' : currentPage.title}
              </h1>
              <p className="text-slate-300 text-sm">
                {isEditing ? 'تغيير وحفظ المحتوى على المنصة مباشرة' : currentPage.subtitle}
              </p>
            </div>
          </div>

          {adminLoggedIn && !isEditing && (
            <button
              onClick={handleStartEdit}
              className="self-start sm:self-center flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-blue-950 px-4 py-2.5 rounded-xl text-xs font-black shadow-md transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>تعديل المحتوى (الإدارة)</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12">
          {isEditing ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الصفحة</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-base font-bold"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">نص الصفحة</label>
                <textarea
                  rows={12}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-base font-medium leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>حفظ التعديلات في المنصة</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-800 text-base leading-loose whitespace-pre-line font-medium">
              {currentPage.content}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
