import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  UserCheck, 
  Megaphone, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Edit3, 
  FileText, 
  RefreshCcw,
  LogOut,
  AlertCircle,
  Eye,
  Save,
  Clock
} from 'lucide-react';
import { WorkerProfile, AdOffer, StaticPageKey } from '../types';
import { CATEGORIES } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    adminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    workers, 
    ads, 
    approveWorker, 
    rejectWorker, 
    deleteWorker, 
    updateWorker,
    approveAd, 
    rejectAd, 
    deleteAd, 
    updateAd,
    staticPages,
    updateStaticPageContent,
    resetAllData,
    openStaticPage
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'pending' | 'approved' | 'ads' | 'pages'>('pending');

  // Edit worker modal state inside admin
  const [editingWorker, setEditingWorker] = useState<WorkerProfile | null>(null);
  const [editWorkerName, setEditWorkerName] = useState('');
  const [editWorkerProfession, setEditWorkerProfession] = useState('');
  const [editWorkerBio, setEditWorkerBio] = useState('');
  const [editWorkerPhone, setEditWorkerPhone] = useState('');

  // Edit ad modal state
  const [editingAd, setEditingAd] = useState<AdOffer | null>(null);
  const [editAdTitle, setEditAdTitle] = useState('');
  const [editAdDesc, setEditAdDesc] = useState('');
  const [editAdPrice, setEditAdPrice] = useState('');

  // Edit page state
  const [editingPageKey, setEditingPageKey] = useState<StaticPageKey | null>(null);
  const [pageTitle, setPageTitle] = useState('');
  const [pageSub, setPageSub] = useState('');
  const [pageContent, setPageContent] = useState('');

  const pendingWorkers = workers.filter(w => w.status === 'pending');
  const pendingAds = ads.filter(a => a.status === 'pending');
  const approvedWorkers = workers.filter(w => w.status === 'approved');
  const approvedAds = ads.filter(a => a.status === 'approved');

  const totalPending = pendingWorkers.length + pendingAds.length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginAdmin(passwordInput)) {
      setPasswordInput('');
    } else {
      setLoginError('كلمة المرور غير صحيحة. الرجاء تجربة كلمة المرور الافتراضية.');
    }
  };

  const handleStartEditWorker = (worker: WorkerProfile) => {
    setEditingWorker(worker);
    setEditWorkerName(worker.name);
    setEditWorkerProfession(worker.profession);
    setEditWorkerBio(worker.bio);
    setEditWorkerPhone(worker.phone);
  };

  const handleSaveWorkerEdit = () => {
    if (editingWorker) {
      updateWorker(editingWorker.id, {
        name: editWorkerName,
        profession: editWorkerProfession,
        bio: editWorkerBio,
        phone: editWorkerPhone
      });
      setEditingWorker(null);
    }
  };

  const handleStartEditAd = (ad: AdOffer) => {
    setEditingAd(ad);
    setEditAdTitle(ad.title);
    setEditAdDesc(ad.description);
    setEditAdPrice(ad.priceText || '');
  };

  const handleSaveAdEdit = () => {
    if (editingAd) {
      updateAd(editingAd.id, {
        title: editAdTitle,
        description: editAdDesc,
        priceText: editAdPrice
      });
      setEditingAd(null);
    }
  };

  const handleStartEditPage = (key: StaticPageKey) => {
    setEditingPageKey(key);
    setPageTitle(staticPages[key].title);
    setPageSub(staticPages[key].subtitle);
    setPageContent(staticPages[key].content);
  };

  const handleSavePage = () => {
    if (editingPageKey) {
      updateStaticPageContent(editingPageKey, {
        title: pageTitle,
        subtitle: pageSub,
        content: pageContent
      });
      setEditingPageKey(null);
    }
  };

  if (!adminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            تسجيل الدخول إلى لوحة تحكم الإدارة
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            مخصصة لمدير منصة ونزة جوبس لمراجعة طلبات الحرفيين والإعلانات وإدارة المحتوى.
          </p>

          {/* Tooltip hint for testing */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 mb-6 text-xs text-amber-900 font-bold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>كلمة المرور الافتراضية للاختبار: <code className="bg-white px-2 py-0.5 rounded text-blue-900">admin123</code></span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                {loginError}
              </div>
            )}

            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-center focus:border-blue-900 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-3 rounded-xl shadow-md transition-colors"
            >
              دخول لوحة التحكم
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Admin Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-blue-950 text-xs font-black mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة تحكم مدير منصة ونزة جوبس</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">
            إدارة الطلبات، الإعلانات، والمحتوى
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            يمكنك اعتماد أو رفض أي ملف حرفي أو إعلان جديد، وتعديل نصوص الصفحات الثابتة بسهولة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAllData}
            className="flex items-center gap-1.5 bg-blue-800/80 hover:bg-blue-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold border border-blue-600 transition-colors"
            title="إعادة تعيين البيانات الافتراضية"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>إعادة تعيين العينات</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            طلبات قيد المراجعة
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-rose-600">
              {totalPending}
            </span>
            <Clock className="w-6 h-6 text-rose-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            الحرفيون المعتمدون (رجال)
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-blue-900">
              {workers.filter(w => w.gender === 'men' && w.status === 'approved').length}
            </span>
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            الحرفيات المعتمدات (نساء)
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-amber-600">
              {workers.filter(w => w.gender === 'women' && w.status === 'approved').length}
            </span>
            <UserCheck className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">
            الإعلانات والعروض المعتمدة
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              {approvedAds.length}
            </span>
            <Megaphone className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Admin Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs mb-6">
        <button
          onClick={() => setActiveAdminSubTab('pending')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeAdminSubTab === 'pending'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>طلبات قيد المراجعة</span>
          {totalPending > 0 && (
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-black">
              {totalPending}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminSubTab('approved')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeAdminSubTab === 'approved'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة الحرفيين (رجال ونساء)</span>
          <span className="bg-blue-100 text-blue-900 text-xs px-2 py-0.5 rounded-full font-black">
            {approvedWorkers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('ads')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeAdminSubTab === 'ads'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>إدارة الإعلانات والعروض</span>
          <span className="bg-emerald-100 text-emerald-900 text-xs px-2 py-0.5 rounded-full font-black">
            {ads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('pages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeAdminSubTab === 'pages'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>تعديل محتوى الصفحات الثابتة</span>
        </button>
      </div>

      {/* 1. Pending Requests Sub Tab */}
      {activeAdminSubTab === 'pending' && (
        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900">
            طلبات الحرفيين والإعلانات الجديدة في انتظار قرارك:
          </h3>

          {pendingWorkers.length === 0 && pendingAds.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="text-base font-black text-slate-900 mb-1">
                لا توجد أي طلبات معلقة حالياً
              </h4>
              <p className="text-xs text-slate-500">
                جميع الملفات والإعلانات تمت مراجعتها واعتمادها.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Pending Workers */}
              {pendingWorkers.map((worker) => (
                <div 
                  key={worker.id}
                  className="bg-white rounded-2xl p-5 border-2 border-amber-300/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={worker.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'}
                      alt={worker.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                          طلب ملف حرفي ({worker.gender === 'men' ? 'رجال' : 'نساء'})
                        </span>
                        <span className="text-xs text-slate-500">تاريخ: {worker.createdAt}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">
                        {worker.name} - <span className="text-blue-700">{worker.profession}</span>
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {worker.bio}
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-2">
                        رقم الهاتف: {worker.phone} {worker.whatsapp && `• واتساب: ${worker.whatsapp}`}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => approveWorker(worker.id)}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>موافقة واعتماد</span>
                    </button>
                    <button
                      onClick={() => handleStartEditWorker(worker)}
                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-blue-950 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => rejectWorker(worker.id)}
                      className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>رفض</span>
                    </button>
                    <button
                      onClick={() => deleteWorker(worker.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                      title="حذف نهائي"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Pending Ads */}
              {pendingAds.map((ad) => (
                <div 
                  key={ad.id}
                  className="bg-white rounded-2xl p-5 border-2 border-emerald-300/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={ad.imageUrl || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80'}
                      alt={ad.title}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                          طلب إعلان ترويجي
                        </span>
                        <span className="text-xs text-slate-500">تاريخ: {ad.createdAt}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">
                        {ad.title}
                      </h4>
                      <p className="text-xs font-bold text-blue-700">
                        صاحب الإعلان: {ad.providerName} • رقم الهاتف: {ad.phone}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {ad.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => approveAd(ad.id)}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>موافقة واعتماد</span>
                    </button>
                    <button
                      onClick={() => handleStartEditAd(ad)}
                      className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-blue-950 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => rejectAd(ad.id)}
                      className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>رفض</span>
                    </button>
                    <button
                      onClick={() => deleteAd(ad.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                      title="حذف نهائي"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Approved Workers Sub Tab */}
      {activeAdminSubTab === 'approved' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              إدارة الحرفيين والمهنيين المعتمدين ({approvedWorkers.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th className="py-3.5 px-4">الحرفي</th>
                  <th className="py-3.5 px-4">المهنة</th>
                  <th className="py-3.5 px-4">القسم</th>
                  <th className="py-3.5 px-4">الهاتف</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {workers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <img
                        src={worker.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'}
                        alt={worker.name}
                        className="w-8 h-8 rounded-lg object-cover shrink-0"
                      />
                      <span>{worker.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-800">
                      {worker.profession}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        worker.gender === 'men' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {worker.gender === 'men' ? 'رجال' : 'نساء'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {worker.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      {worker.status === 'approved' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          معتمد
                        </span>
                      )}
                      {worker.status === 'pending' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                          قيد المراجعة
                        </span>
                      )}
                      {worker.status === 'rejected' && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                          مرفوض
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditWorker(worker)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                          title="تعديل"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {worker.status !== 'approved' && (
                          <button
                            onClick={() => approveWorker(worker.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="اعتماد"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteWorker(worker.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Approved Ads Sub Tab */}
      {activeAdminSubTab === 'ads' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              إدارة الإعلانات والعروض الترويجية ({ads.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
                  <th className="py-3.5 px-4">الإعلان</th>
                  <th className="py-3.5 px-4">المعلن</th>
                  <th className="py-3.5 px-4">الهاتف</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {ad.title}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-800">
                      {ad.providerName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {ad.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      {ad.status === 'approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          معتمد
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                          قيد المراجعة
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStartEditAd(ad)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                          title="تعديل"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {ad.status !== 'approved' && (
                          <button
                            onClick={() => approveAd(ad.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            title="اعتماد"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteAd(ad.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Edit Static Pages Content Tab - As required by Section 7 */}
      {activeAdminSubTab === 'pages' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-lg font-black text-slate-900 mb-4">
            إدارة محتوى الصفحات الثابتة (من نحن، رسالتنا، سياسة الخصوصية، إخلاء المسؤولية):
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            اختر الصفحة التي تريد تعديل نصها لتحديثها فورياً في الموقع دون الحاجة لتعديل الكود.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['about', 'mission', 'privacy', 'disclaimer'] as StaticPageKey[]).map((key) => (
              <div 
                key={key}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-1">
                    {staticPages[key].title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-4">
                    {staticPages[key].subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEditPage(key)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white py-2 px-3 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>تعديل المحتوى</span>
                  </button>
                  <button
                    onClick={() => openStaticPage(key)}
                    className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700"
                    title="معاينة الصفحة"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inline Modal for Editing Worker Profile in Admin */}
      {editingWorker && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900">تعديل بيانات الحرفي</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الاسم</label>
              <input
                type="text"
                value={editWorkerName}
                onChange={(e) => setEditWorkerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المهنة</label>
              <input
                type="text"
                value={editWorkerProfession}
                onChange={(e) => setEditWorkerProfession(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف</label>
              <input
                type="text"
                value={editWorkerPhone}
                onChange={(e) => setEditWorkerPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الوصف</label>
              <textarea
                rows={3}
                value={editWorkerBio}
                onChange={(e) => setEditWorkerBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-medium"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingWorker(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveWorkerEdit}
                className="px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Modal for Editing Ad in Admin */}
      {editingAd && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900">تعديل الإعلان أو العرض</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الإعلان</label>
              <input
                type="text"
                value={editAdTitle}
                onChange={(e) => setEditAdTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نص السعر أو التخفيض</label>
              <input
                type="text"
                value={editAdPrice}
                onChange={(e) => setEditAdPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل الإعلان</label>
              <textarea
                rows={3}
                value={editAdDesc}
                onChange={(e) => setEditAdDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-medium"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingAd(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveAdEdit}
                className="px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Modal for Editing Static Page in Admin */}
      {editingPageKey && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              تعديل محتوى الصفحة: {staticPages[editingPageKey].title}
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">العنوان</label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الفرعي</label>
              <input
                type="text"
                value={pageSub}
                onChange={(e) => setPageSub(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نص الصفحة</label>
              <textarea
                rows={8}
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-medium leading-relaxed"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPageKey(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSavePage}
                className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>حفظ في المنصة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
