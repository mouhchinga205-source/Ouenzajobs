import { WorkerProfile, AdOffer, StaticPageContent, StaticPageKey, CategoryOption } from '../types';

// أقسام مهن الرجال (11 مهنة)
export const MEN_CATEGORIES: CategoryOption[] = [
  { id: 'all', name: 'جميع المهن', iconName: 'Grid' },
  { id: 'painting_men', name: 'دهن المنازل', iconName: 'Paintbrush' },
  { id: 'placo', name: 'بلاكو بلاتر', iconName: 'Layers' },
  { id: 'building', name: 'بناء و تفصيل', iconName: 'Home' },
  { id: 'electricity_men', name: 'كهرباء منزلية', iconName: 'Zap' },
  { id: 'hvac', name: 'تدفئة و تبريد', iconName: 'Thermometer' },
  { id: 'catering_men', name: 'طبخ للمناسبات', iconName: 'Utensils' },
  { id: 'carpentry_men', name: 'نجارة و ألمنيوم', iconName: 'Hammer' },
  { id: 'auto', name: 'ميكانيك و كهرباء السيارات', iconName: 'Wrench' },
  { id: 'plumbing_men', name: 'ترصيص صحي', iconName: 'Droplet' },
  { id: 'delivery', name: 'توصيل طلبيات', iconName: 'Truck' },
  { id: 'other_men', name: 'أخرى', iconName: 'MoreHorizontal' },
];

// أقسام مهن النساء (8 مهن)
export const WOMEN_CATEGORIES: CategoryOption[] = [
  { id: 'all', name: 'جميع المهن', iconName: 'Grid' },
  { id: 'beauty', name: 'حلاقة و تجميل', iconName: 'Sparkles' },
  { id: 'sweets', name: 'صناعة الحلويات', iconName: 'Cake' },
  { id: 'sewing', name: 'خياطة و تفصيل', iconName: 'Scissors' },
  { id: 'education', name: 'دروس خصوصية', iconName: 'BookOpen' },
  { id: 'catering_women', name: 'طبخ للمناسبات', iconName: 'Utensils' },
  { id: 'home_cooking', name: 'طبخ منزلي', iconName: 'Coffee' },
  { id: 'accessories', name: 'أكسسوارات', iconName: 'Heart' },
  { id: 'other_women', name: 'أخرى', iconName: 'MoreHorizontal' },
];

// القائمة الموحدة لجميع الأصناف (للاستخدام في الإعلانات والإدارة)
export const CATEGORIES: CategoryOption[] = [
  { id: 'all', name: 'جميع المهن', iconName: 'Grid' },
  { id: 'painting_men', name: 'دهن المنازل', iconName: 'Paintbrush' },
  { id: 'placo', name: 'بلاكو بلاتر', iconName: 'Layers' },
  { id: 'building', name: 'بناء و تفصيل', iconName: 'Home' },
  { id: 'electricity_men', name: 'كهرباء منزلية', iconName: 'Zap' },
  { id: 'hvac', name: 'تدفئة و تبريد', iconName: 'Thermometer' },
  { id: 'catering_men', name: 'طبخ للمناسبات (رجال)', iconName: 'Utensils' },
  { id: 'carpentry_men', name: 'نجارة و ألمنيوم', iconName: 'Hammer' },
  { id: 'auto', name: 'ميكانيك و كهرباء السيارات', iconName: 'Wrench' },
  { id: 'plumbing_men', name: 'ترصيص صحي', iconName: 'Droplet' },
  { id: 'delivery', name: 'توصيل طلبيات', iconName: 'Truck' },
  { id: 'other_men', name: 'أخرى (رجال)', iconName: 'MoreHorizontal' },
  { id: 'beauty', name: 'حلاقة و تجميل', iconName: 'Sparkles' },
  { id: 'sweets', name: 'صناعة الحلويات', iconName: 'Cake' },
  { id: 'sewing', name: 'خياطة و تفصيل', iconName: 'Scissors' },
  { id: 'education', name: 'دروس خصوصية', iconName: 'BookOpen' },
  { id: 'catering_women', name: 'طبخ للمناسبات (نساء)', iconName: 'Utensils' },
  { id: 'home_cooking', name: 'طبخ منزلي', iconName: 'Coffee' },
  { id: 'accessories', name: 'أكسسوارات', iconName: 'Heart' },
  { id: 'other_women', name: 'أخرى (نساء)', iconName: 'MoreHorizontal' },
];

export const INITIAL_WORKERS: WorkerProfile[] = [
  // مهن الرجال - Male Artisans in Ouenza
  {
    id: 'w-1',
    name: 'محمد العبيدي',
    profession: 'كهربائي منازل وصيانة عامة',
    category: 'electricity_men',
    gender: 'men',
    experienceYears: '12 سنة',
    bio: 'كهربائي معتمد ذو خبرة طويلة في تركيب وصيانة الشبكات الكهربائية المنزلية والتجارية بـ ونزة-تبسة-الجزائر. إصلاح الأعطال المستعجلة، تركيب لوحات التحكم، وتمديد الكابلات بضمان الجودة.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    phone: '0661234567',
    whatsapp: '213661234567',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-15',
    location: 'وسط مدينة ونزة - حي السلام',
    rating: 4.9,
    completedJobs: 84
  },
  {
    id: 'w-2',
    name: 'عبد الرحمن بوعزيز',
    profession: 'سباك (رصّاص) وتدفئة مركزية',
    category: 'plumbing_men',
    gender: 'men',
    experienceYears: '15 سنة',
    bio: 'متخصص في تركيب وصيانة أنابيب المياه والغاز والتدفئة المركزية. كشف وتصليح التسربات، تركيب سخانات الماء والخزانات، وإنجاز شبكات الصرف الصحي باحترافية وسرعة في الإنجاز.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    phone: '0552345678',
    whatsapp: '213552345678',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-18',
    location: 'ونزة - حي 500 مسكن',
    rating: 4.8,
    completedJobs: 110
  },
  {
    id: 'w-3',
    name: 'توفيق الشاوي',
    profession: 'نجار خشب وألمنيوم وديكور',
    category: 'carpentry_men',
    gender: 'men',
    experienceYears: '10 سنوات',
    bio: 'تصميم وتفصيل مطابخ عصرية، خزائن حائطية (Dressing)، أبواب ونوافذ ألمنيوم PVC و PVC. جودة عالية في الخشب والأكسسوارات مع دقة في المواعيد والتركيب.',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=80',
    phone: '0770112233',
    whatsapp: '213770112233',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-20',
    location: 'ونزة - الطريق الرئيسي',
    rating: 5.0,
    completedJobs: 65
  },
  {
    id: 'w-4',
    name: 'رشيد منصوري',
    profession: 'دهان وديكور داخلي (Placo Plâtre)',
    category: 'placo',
    gender: 'men',
    experienceYears: '9 سنوات',
    bio: 'دهانات داخلية وخارجية بجميع الأنواع العصرية (ستيكو، ساتيني، قطيفة، فيرنتشي)، ديكور جبس بورد (Placo Plâtre)، أسقف معلقة، وإضاءة مخفية للمنازل والمحلات التجارية.',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=80',
    phone: '0668445566',
    whatsapp: '213668445566',
    status: 'approved',
    createdAt: '2026-07-22',
    location: 'ونزة - حي النصر',
    rating: 4.7,
    completedJobs: 73
  },
  {
    id: 'w-5',
    name: 'حكيم قدور',
    profession: 'تصليح الثلاجات والغسالات والأجهزة المنزلية',
    category: 'hvac',
    gender: 'men',
    experienceYears: '14 سنة',
    bio: 'إصلاح جميع أنواع الثلاجات، المكيفات الهوائية، الغسالات الأوتوماتيكية، والأفران المنزلية. خدمة متنقلة إلى منزل العميل في ونزة مع توفير قطع غيار أصلية وضمان على التصليح.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80',
    phone: '0555998877',
    whatsapp: '213555998877',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-25',
    location: 'ونزة - حي المناجم',
    rating: 4.9,
    completedJobs: 140
  },

  // مهن النساء - Female Artisans in Ouenza
  {
    id: 'w-6',
    name: 'السيدة كريمة (أم رامي)',
    profession: 'خياطة وتفصيل ألبسة تقليدية وعصرية',
    category: 'sewing',
    gender: 'women',
    experienceYears: '16 سنة',
    bio: 'خياطة وتفصيل القنادر، القفطان الجزائري، الفساتين العصرية، وتجهيز جهاز العروس بأرقى الأقمشة والقصّات. استقبال مخصص للنساء في ورشتي المنزلية بونزة.',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=500&auto=format&fit=crop&q=80',
    phone: '0663112244',
    whatsapp: '213663112244',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-16',
    location: 'ونزة - حي الحدائق',
    rating: 5.0,
    completedJobs: 190
  },
  {
    id: 'w-7',
    name: 'نجمة للحلويات التقليدية والعصرية',
    profession: 'صناعة حلويات الأفراح والمناسبات',
    category: 'sweets',
    gender: 'women',
    experienceYears: '11 سنة',
    bio: 'تحضير كافة أنواع الحلويات الجزائرية التقليدية (بقلاوة، مقروط اللوز، تشاراك، لعرايش) والحلويات العصرية والطورطات لحفلات الزفاف، الخطوبة، وأعياد الميلاد بمكونات رفيعة ومذاق أصيل.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80',
    phone: '0772445588',
    whatsapp: '213772445588',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-19',
    location: 'ونزة - حي الأمل',
    rating: 4.9,
    completedJobs: 215
  },
  {
    id: 'w-8',
    name: 'صالون ليلى للتجميل والعرائس',
    profession: 'خبيرة تجميل وتجهيز العرائس',
    category: 'beauty',
    gender: 'women',
    experienceYears: '8 سنوات',
    bio: 'تسريحات شعر احترافية، مكياج العرائس بأحدث التقنيات، عناية بالبشرة، صبغات شعر، وكيراتين. صالون مجهز بأحدث المعدات في جو مريح ومخصص للسيدات فقط.',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
    phone: '0558776655',
    whatsapp: '213558776655',
    facebook: 'https://facebook.com',
    status: 'approved',
    createdAt: '2026-07-21',
    location: 'ونزة - وسط المدينة',
    rating: 4.8,
    completedJobs: 150
  },
  {
    id: 'w-9',
    name: 'الأستاذة مريم بن عيسى',
    profession: 'دروس دعم في اللغات والرياضيات للمرحلة المتوسطة والثانوية',
    category: 'education',
    gender: 'women',
    experienceYears: '7 سنوات',
    bio: 'تقديم دروس تقوية في اللغة الفرنسية والرياضيات بأساليب بيداغوجية مبسطة، ومرافقة التلاميذ للتحضير الجيد لشهادات التعليم المتوسط (BEM) والبكالوريا في مجموعات صغيرة أو فردية.',
    imageUrl: 'https://images.unsplash.com/photo-1580894732244-8aef130f146f?w=500&auto=format&fit=crop&q=80',
    phone: '0669887744',
    whatsapp: '213669887744',
    status: 'approved',
    createdAt: '2026-07-24',
    location: 'ونزة - حي السعادة',
    rating: 5.0,
    completedJobs: 60
  },

  // عينات طلبات قيد المراجعة لاختبار لوحة التحكم - Sample Pending requests for Admin Demo
  {
    id: 'w-10',
    name: 'سمير قسنطيني',
    profession: 'فني كاميرات مراقبة وشبكات (CCTV & Réseau)',
    category: 'electronics',
    gender: 'men',
    experienceYears: '6 سنوات',
    bio: 'تركيب أنظمة كاميرات المراقبة الأمنية (HD و IP)، ضبط أجهزة تسجيل DVR/NVR وروبوتات الإنذار للشركات والمنازل بونزة.',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&auto=format&fit=crop&q=80',
    phone: '0665332211',
    whatsapp: '213665332211',
    status: 'pending',
    createdAt: '2026-08-01',
    location: 'ونزة - حي المحطة'
  }
];

export const INITIAL_ADS: AdOffer[] = [
  {
    id: 'ad-1',
    title: 'تخفيض 20% على تركيب صالونات ومطابخ خشبية وألمنيوم',
    providerName: 'ورشة توفيق الشاوي للنجارة',
    category: 'carpentry',
    description: 'بمناسبة فصل الصيف، نقدم تخفيضاً خاصاً بنسبة 20% على طلبات المطابخ الحديثة والخزائن الحائطية بمواد مستوردة ومقاومة للرطوبة. معاينة ومقاييس مجانية في جميع أحياء ونزة.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    phone: '0770112233',
    whatsapp: '213770112233',
    facebook: 'https://facebook.com',
    priceText: 'تخفيض 20%',
    status: 'approved',
    createdAt: '2026-07-26',
    expiresAt: '2026-08-31'
  },
  {
    id: 'ad-2',
    title: 'عرض خاص للعرائس: باقة تجميل متكاملة مع العناية بالبشرة',
    providerName: 'صالون ليلى للتجميل',
    category: 'beauty',
    description: 'باقة العروس الملكية تشمل: تسريحة شعر، مكياج سينمائي، تنظيف عميق للبشرة، وعناية بالأظافر بسعر تنافسي جداً مع هدية خاصة لكل عروس تحجز خلال هذا الأسبوع.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    phone: '0558776655',
    whatsapp: '213558776655',
    priceText: 'باقة خاصة 18,000 د.ج',
    status: 'approved',
    createdAt: '2026-07-28'
  },
  {
    id: 'ad-3',
    title: 'خدمة غسيل السجاد والكنب بالبخار في المنزل',
    providerName: 'كلين ونزة للخدمات المنزلية',
    category: 'transport',
    description: 'تنظيف وغسيل وتجفيف فوري للسجاد، الموكيت، الصالونات، ومراتب الأسرّة بأجهزة البخار الاحترافية مع إزالة البقع والروائح الكريهة وتعقيم شامل في مكانك دون الحاجة للنقل.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    phone: '0662998877',
    whatsapp: '213662998877',
    priceText: 'أسعار مناسبة لكل متر',
    status: 'approved',
    createdAt: '2026-07-29'
  },
  // إعلان قيد المراجعة لاختبار المدير
  {
    id: 'ad-4',
    title: 'دورة تدريبية في الخياطة والتفصيل العصري (مستوى مبتدئ)',
    providerName: 'ورشة أم رامي للخياطة',
    category: 'sewing',
    description: 'فتح باب التسجيل لدورة خياطة وتفصيل مدتها شهرين، تعليم القص باترون وخياطة ملابس عصرية وتقليدية مع تطبيق عملي مباشر وبشهادة مشاركة.',
    imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80',
    phone: '0663112244',
    whatsapp: '213663112244',
    priceText: 'مقاعد محدودة',
    status: 'pending',
    createdAt: '2026-08-01'
  }
];

export const INITIAL_STATIC_PAGES: Record<StaticPageKey, StaticPageContent> = {
  about: {
    title: 'من نحن - ونزة جوبس (Ouenza Jobs)',
    subtitle: 'الفضاء الرقمي الأول المجاني الذي يربط أصحاب الحرف والمهن بسكان ونزة-تبسة-الجزائر',
    content: `منصة "ونزة جوبس" (Ouenza Jobs) هي دليل رقمي مجاني بالكامل تم تصميمه وبناؤه خصيصاً لخدمة مجتمع ونزة-تبسة-الجزائر والمناطق المجاورة لها.

تهدف المنصة إلى القضاء على صعوبة البحث التقليدي عن الحرفيين والمهنيين ومقدمي الخدمات في المنطقة، من خلال توفير فهرس شامل ومنظم وموثوق يضم أصحاب وصاحبات المهن في مكان واحد يسهل الوصول إليه في أي وقت ومن أي جهاز.

مميزاتنا الأساسية:
• مجانية 100%: لا توجد أي رسوم تسجيل أو اشتراكات أو عمولات على الحرفيين أو الزوار.
• دعم كامل لمهن الرجال ومهن النساء في أقسام مخصصة تسهّل التواصل والخصوصية.
• سهولة التواصل: أزرار اتصال مباشر عبر الهاتف، واتساب، وفيسبوك بضغطة زر واحدة.
• إشراف ومراجعة: كل ملف أو إعلان يمر بمرحلة مراجعة من الإدارة لضمان الجودة والمصداقية.`
  },
  mission: {
    title: 'رسالتنا ورؤيتنا المستقبلية',
    subtitle: 'رقمنة سوق العمل الحرفي والخدماتي في ونزة ودعم المواهب المحلية',
    content: `رسالتنا تتمثل في تمكين كل حرفي وحرفية في ونزة-تبسة-الجزائر، سواء كان ذو خبرة لسنوات طويلة أو شاباً يبدأ مشروعه، من الحصول على واجهة تعريفية احترافية تبرز مهاراته وأعماله وتصل إلى آلاف العملاء بسهولة.

رؤيتنا:
• بناء جسر من الثقة المتبادلة بين طالب الخدمة والمهني في مدينة ونزة.
• دعم المرأة العاملة والحرفيات المنزليات في التعريف بمنتجاتهن (خياطة، حلويات، تجميل، تعليم) بكل خصوصية واحترام.
• تشجيع الاقتصاد المحلي في المنطقة وتطوير معايير تقديم الخدمات الحرفية والتقنية.`
  },
  privacy: {
    title: 'سياسة الخصوصية وحماية البيانات',
    subtitle: 'كيف نتعامل مع معلوماتك الشخصية في ونزة جوبس',
    content: `نحن في "ونزة جوبس" نلتزم بأعلى معايير حماية خصوصية المستخدمين:

1. البيانات التي نجمعها:
عند تسجيل ملفك الشخصي أو إعلانك، نقوم بجمع المعلومات التي تقدمها طواعية (الاسم، المهنة، الوصف، أرقام الهاتف، روابط التواصل، والصورة).

2. استخدام البيانات:
تُعرض البيانات المقدمة علناً في بطاقة ملفك الشخصي لتسهيل تواصل الجمهور معك مباشرة في إطار عملي ومهني.

3. عدم مشاركة البيانات مع جهات تجارية:
لا نقوم ببيع أو تأجير أرقام هواتف المستخدمين أو بياناتهم لأي جهات تسويقية خارجية.

4. حق التعديل أو الحذف:
يحق لأي حرفي في أي وقت طلب تعديل بياناته أو إزالة ملفه من المنصة نهائياً عبر التواصل مع إدارة المنصة.`
  },
  disclaimer: {
    title: 'إخلاء المسؤولية القانونية',
    subtitle: 'توضيح هام حول دور المنصة كدليل ووسيط تعريفي',
    content: `منصة "ونزة جوبس" (Ouenza Jobs) تعمل كدليل رقمي تعريفي ووسيط يسهل الاتصال المباشر بين طالب الخدمة وأصحاب المهن والحرف.

تنبيهات هامة للمستخدمين:
• المنصة لا تتقاضى أي عمولة على الأعمال أو الصفقات التي تتم بين الطرفين.
• الاتفاق على الأسعار، المواعيد، وجودة العمل يتم مباشرة بين الزبون والحرفي دون تدخل المنصة.
• على الرغم من حرص الإدارة على مراجعة الملفات قبل نشرها، فإن المنصة لا تتحمل أي مسؤولية قانونية أو تعاقدية عن جودة الخدمات المقدمة، أو أي خلاف قد ينشأ بين طالب الخدمة ومقدمها.
• ننصح دائماً بالاتفاق الواضح والمعاينة المسبقة للأعمال والأسعار قبل البدء في التنفيذ.`
  }
};
