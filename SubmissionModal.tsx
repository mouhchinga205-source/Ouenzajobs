import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Upload, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Facebook, 
  Briefcase, 
  User, 
  Award, 
  MapPin, 
  AlertCircle,
  Sparkles,
  Tag,
  FileText
} from 'lucide-react';
import { CATEGORIES, MEN_CATEGORIES, WOMEN_CATEGORIES } from '../data/initialData';
import { GenderSection } from '../types';

export const SubmissionModal: React.FC = () => {
  const { 
    submissionModalOpen, 
    closeSubmissionModal, 
    submissionType, 
    submissionGender,
    addWorkerProfile, 
    addAdOffer 
  } = useApp();

  // Form states
  const [formType, setFormType] = useState<'profile' | 'ad'>(submissionType);
  const [gender, setGender] = useState<GenderSection>(submissionGender);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [category, setCategory] = useState('painting_men');
  const [experienceYears, setExperienceYears] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [facebook, setFacebook] = useState('');
  const [location, setLocation] = useState('ونزة-تبسة-الجزائر');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Ad specific states
  const [adTitle, setAdTitle] = useState('');
  const [adProvider, setAdProvider] = useState('');
  const [adPrice, setAdPrice] = useState('');
  const [adDescription, setAdDescription] = useState('');

  // Status state
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (submissionModalOpen) {
      setFormType(submissionType);
      setGender(submissionGender);
      const defaultCat = submissionGender === 'men' ? MEN_CATEGORIES[1].id : WOMEN_CATEGORIES[1].id;
      setCategory(defaultCat);
      setSubmittedSuccess(false);
      setErrorMessage('');
    }
  }, [submissionModalOpen, submissionType, submissionGender]);

  const handleGenderChange = (newGender: GenderSection) => {
    setGender(newGender);
    const defaultCat = newGender === 'men' ? MEN_CATEGORIES[1].id : WOMEN_CATEGORIES[1].id;
    setCategory(defaultCat);
  };

  if (!submissionModalOpen) return null;

  // Handle local image file upload preview
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5 ميغابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setImageUrl(base64String);
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetImage = (url: string) => {
    setImageUrl(url);
    setImagePreview(url);
  };

  const validatePhone = (num: string) => {
    const clean = num.replace(/\D/g, '');
    return clean.length >= 9 && clean.length <= 13;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!phone || !validatePhone(phone)) {
      setErrorMessage('الرجاء إدخال رقم هاتف صحيح ومتاح للاتصال (مثال: 0661234567).');
      return;
    }

    if (formType === 'profile') {
      if (!name.trim() || !profession.trim() || !bio.trim()) {
        setErrorMessage('الرجاء إكمال جميع الحقول الأساسية (الاسم، المهنة، والوصف).');
        return;
      }

      addWorkerProfile({
        name: name.trim(),
        profession: profession.trim(),
        category,
        gender,
        experienceYears: experienceYears.trim() || 'خبرة مهنية',
        bio: bio.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || undefined,
        facebook: facebook.trim() || undefined,
        location: location.trim() || 'ونزة',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
        rating: 5.0,
        completedJobs: 0
      });
    } else {
      if (!adTitle.trim() || !adProvider.trim() || !adDescription.trim()) {
        setErrorMessage('الرجاء إدخال عنوان الإعلان، اسم صاحب العرض، والتفاصيل.');
        return;
      }

      addAdOffer({
        title: adTitle.trim(),
        providerName: adProvider.trim(),
        category,
        description: adDescription.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || undefined,
        facebook: facebook.trim() || undefined,
        priceText: adPrice.trim() || undefined,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80'
      });
    }

    setSubmittedSuccess(true);
  };

  const resetForm = () => {
    setName('');
    setProfession('');
    setExperienceYears('');
    setBio('');
    setPhone('');
    setWhatsapp('');
    setFacebook('');
    setImageUrl('');
    setImagePreview(null);
    setAdTitle('');
    setAdProvider('');
    setAdPrice('');
    setAdDescription('');
    setSubmittedSuccess(false);
    closeSubmissionModal();
  };

  const presetImages = [
    { name: 'كهرباء/تقني', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80' },
    { name: 'سباكة/بناء', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80' },
    { name: 'نجارة/ديكور', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=80' },
    { name: 'خياطة/أزياء', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80' },
    { name: 'حلويات/طبخ', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80' },
    { name: 'تجميل/عناية', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">
                {formType === 'profile' ? 'تسجيل ملف حرفي أو مهني جديد' : 'نشر إعلان أو عرض ترويجي جديد'}
              </h3>
              <p className="text-xs text-slate-300">
                منصة ونزة جوبس مجانية 100% بدون أي رسوم تسجيل
              </p>
            </div>
          </div>

          <button
            onClick={closeSubmissionModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          /* Success Screen */
          <div className="p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2">
              تم إرسال طلبك بنجاح وهو الآن قيد المراجعة!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              شكراً لك على انضمامك إلى منصة "ونزة جوبس". سيقوم مدير المنصة بمراجعة البيانات والتأكد من صحتها ليتم اعتمادها ونشرها للعموم في أقرب وقت.
            </p>
            <button
              onClick={resetForm}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              حسناً، إغلاق النافذة
            </button>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Choose form type tab if user wants to switch */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setFormType('profile')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  formType === 'profile'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. تسجيل ملف حرفي / مهني
              </button>
              <button
                type="button"
                onClick={() => setFormType('ad')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  formType === 'ad'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. نشر إعلان أو عرض ترويجي
              </button>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Profile Fields */}
            {formType === 'profile' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      الاسم الكامل أو شهرة الحرفي *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: محمد العبيدي (أو ورشة النور)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      اسم المهنة أو الحرفة *
                    </label>
                    <input
                      type="text"
                      required
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="مثال: كهربائي منازل وصيانة عامة"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      التصنيف المهني *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    >
                      {(gender === 'men' ? MEN_CATEGORIES : WOMEN_CATEGORIES)
                        .filter(c => c.id !== 'all')
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Gender Section */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      القسم (رجال / نساء) *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => handleGenderChange(e.target.value as GenderSection)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    >
                      <option value="men">قسم مهن الرجال</option>
                      <option value="women">قسم مهن النساء</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      سنوات الخبرة *
                    </label>
                    <input
                      type="text"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      placeholder="مثال: 10 سنوات"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Bio & Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    وصف عن خدماتك، مهاراتك، والضمان الذي تقدمه *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="اكتب نبذة واضحة عن الخدمات التي تقدمها، خبرتك، وجودة عملك لتشجيع الزبائن على التواصل معك..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                  />
                </div>
              </>
            )}

            {/* Ad Fields */}
            {formType === 'ad' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Ad Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      عنوان الإعلان أو العرض *
                    </label>
                    <input
                      type="text"
                      required
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="مثال: تخفيض 20% على تركيب المطابخ العصرية"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Provider Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      اسم صاحب العرض أو الورشة *
                    </label>
                    <input
                      type="text"
                      required
                      value={adProvider}
                      onChange={(e) => setAdProvider(e.target.value)}
                      placeholder="مثال: ورشة توفيق للنجارة"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تصنيف الخدمة *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Text */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      السعر أو نسبة التخفيض (اختياري)
                    </label>
                    <input
                      type="text"
                      value={adPrice}
                      onChange={(e) => setAdPrice(e.target.value)}
                      placeholder="مثال: تخفيض 15% أو أسعار تنافسية"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Ad Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تفاصيل الإعلان أو العرض *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    placeholder="اشرح تفاصيل العرض، المنتجات، المزايا، وفترة سريان العرض في ونزة..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold focus:bg-white focus:border-blue-900 focus:outline-hidden"
                  />
                </div>
              </>
            )}

            {/* Photo / Image Section - Input File with Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>صورة شخصية أو صورة تمثل المهنة / الإعلان (مع معاينة Preview)</span>
                <span className="text-slate-400 font-normal">اختياري - يمكنك رفع صورة من جهازك</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Preview Thumbnail */}
                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="معاينة" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                {/* File Upload Input */}
                <div className="flex-1 w-full">
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 text-blue-900 font-bold px-4 py-3 rounded-xl cursor-pointer transition-all text-xs sm:text-sm">
                    <Upload className="w-4 h-4 text-blue-700" />
                    <span>اضغط هنا لرفع صورة من هاتفك أو جهازك</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 text-center sm:text-right">
                    أو اختر واحدة من الصور التعبيرية الجاهزة أدناه:
                  </p>
                </div>
              </div>

              {/* Quick Preset Images */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 mt-2 no-scrollbar">
                {presetImages.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPresetImage(p.url)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 transition-colors ${
                      imagePreview === p.url
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information - Mandatory phone, optional WhatsApp & FB */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
              <h5 className="text-xs font-bold text-blue-950 mb-3 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-800" />
                <span>معلومات التواصل المباشر مع العملاء</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف (إجباري) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 0661234567"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:border-blue-900 focus:outline-hidden"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الواتساب (اختياري)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="مثال: 0661234567"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:border-blue-900 focus:outline-hidden"
                  />
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رابط صفحة الفيسبوك
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:border-blue-900 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeSubmissionModal}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-black px-8 py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
              >
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>إرسال الطلب للمراجعة</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
