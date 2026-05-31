export const en = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Work",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    resume: "Résumé",
    menu: "Open menu",
  },
  meta: {
    title: "Your Name — Editorial Portfolio",
    description:
      "Senior product engineer crafting calm, considered software. Selected work, experience, and writing.",
  },
  hero: {
    eyebrow: "Portfolio · 2026",
    title: ["Quiet craft", "for noisy", "interfaces."],
    lede: "I'm a senior product engineer designing and shipping bilingual, performant interfaces for teams who care about the small things.",
    cta: "See selected work",
    ctaSecondary: "Get in touch",
    location: "Based in Riyadh · Working worldwide",
  },
  about: {
    eyebrow: "About",
    title: "An engineer with an editor's eye.",
    body: [
      "I've spent the last eight years building product surfaces — design systems, marketing sites, dashboards, and the occasional weird side project — for startups and studios across the Gulf and Europe.",
      "My work sits at the seam between design and engineering: typography that breathes, motion that means something, and code that holds up under load.",
    ],
    stats: [
      { value: "8+", label: "Years shipping" },
      { value: "40+", label: "Products launched" },
      { value: "12", label: "Languages spoken (by code)" },
    ],
  },
  skills: {
    eyebrow: "Capabilities",
    title: "A focused toolkit.",
    groups: [
      {
        name: "Engineering",
        items: ["React 19", "TypeScript", "TanStack Start", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        name: "Design",
        items: ["Design Systems", "Typography", "Figma", "Prototyping", "Brand Direction"],
      },
      {
        name: "Platform",
        items: ["Postgres", "Supabase", "Cloudflare", "Vercel", "Edge functions"],
      },
    ],
  },
  projects: {
    eyebrow: "Selected work",
    title: "Recent projects.",
    all: "All",
    view: "View case",
    items: [
      {
        slug: "atlas",
        category: "Product",
        name: "Atlas",
        summary: "A workspace for long-form research teams. Designed and engineered end-to-end.",
        year: "2025",
        role: "Design + Engineering",
        body: "Atlas replaced a sprawling stack of notes, citation managers, and shared docs with a single typographically considered surface. We obsessed over reading comfort, citation density, and how the cursor felt at 120Hz.",
      },
      {
        slug: "kalima",
        category: "Brand",
        name: "Kalima",
        summary: "A bilingual publishing platform for Arabic essayists. RTL-first, print-aware.",
        year: "2024",
        role: "Tech Lead",
        body: "Kalima ships essays in Arabic and English with shared visual language. The hardest part was making serif latin and Tajawal sing together at every weight and size.",
      },
      {
        slug: "loop",
        category: "Product",
        name: "Loop",
        summary: "A calm scheduling tool for two-person teams. Zero notifications, by design.",
        year: "2024",
        role: "Founding Engineer",
        body: "Loop reduces the back-and-forth of scheduling by removing notifications altogether. State lives in a shared, append-only log; the UI is mostly margin.",
      },
      {
        slug: "studio-site",
        category: "Site",
        name: "Studio site",
        summary: "A site for an architecture studio in Jeddah. Letterpress meets the modern web.",
        year: "2023",
        role: "Design + Engineering",
        body: "We built a CMS-light marketing site with editorial pacing, lazy media, and a footer that doubles as a colophon.",
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've worked.",
    items: [
      {
        period: "2023 — Present",
        role: "Senior Product Engineer",
        company: "Independent",
        body: "Partnering with founders and studios on product launches, design systems, and bilingual marketing surfaces.",
      },
      {
        period: "2020 — 2023",
        role: "Tech Lead",
        company: "Northwind Labs",
        body: "Led front-end for a 14-person team. Shipped a design system used across six products, plus a print-quality docs site.",
      },
      {
        period: "2017 — 2020",
        role: "Product Engineer",
        company: "Foundry",
        body: "Built marketing and dashboard surfaces for early-stage startups. First exposure to RTL-first product work.",
      },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "Where I learned.",
    items: [
      {
        period: "2015 — 2017",
        degree: "M.Sc. Human–Computer Interaction",
        school: "University of Edinburgh",
      },
      {
        period: "2011 — 2015",
        degree: "B.Sc. Computer Science",
        school: "King Fahd University of Petroleum & Minerals",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell me about the work.",
    lede: "I take on a handful of projects each year. Send a short note about what you're building and a realistic timeline.",
    name: "Your name",
    email: "Email",
    message: "What are you building?",
    send: "Send note",
    sending: "Sending…",
    sent: "Thanks — I'll reply within two business days.",
    error: "Something went wrong. Try again or email directly.",
    direct: "Or write directly:",
  },
  footer: {
    colophon: "Set in Instrument Serif & Work Sans · Tajawal for Arabic. Built with React, TanStack Start, and a lot of whitespace.",
    rights: "© 2026 — All rights reserved.",
  },
  toggle: {
    theme: "Toggle theme",
    locale: "Switch language",
    light: "Light",
    dark: "Dark",
  },
  project: {
    back: "All work",
    role: "Role",
    year: "Year",
    category: "Category",
    notFound: "Project not found.",
  },
};

export type Dictionary = typeof en;

export const ar: Dictionary = {
  nav: {
    about: "نبذة",
    skills: "المهارات",
    projects: "أعمال",
    experience: "الخبرة",
    education: "التعليم",
    contact: "تواصل",
    resume: "السيرة الذاتية",
    menu: "فتح القائمة",
  },
  meta: {
    title: "اسمك — معرض الأعمال",
    description:
      "مهندس منتجات أوّل يصمّم واجهات هادئة ومدروسة. أعمال مختارة، وخبرات، وكتابات.",
  },
  hero: {
    eyebrow: "معرض الأعمال · ٢٠٢٦",
    title: ["حِرفة هادئة", "لواجهات", "صاخبة."],
    lede: "أنا مهندس منتجات أوّل أصمّم وأطوّر واجهات ثنائية اللغة وعالية الأداء لفِرَق تهتم بالتفاصيل الصغيرة.",
    cta: "تصفّح الأعمال",
    ctaSecondary: "تواصل معي",
    location: "مقرّي الرياض · أعمل عن بُعد حول العالم",
  },
  about: {
    eyebrow: "نبذة",
    title: "مهندس بعينِ محرّر.",
    body: [
      "قضيت السنوات الثماني الماضية في بناء واجهات المنتجات — أنظمة تصميم، ومواقع تسويقية، ولوحات تحكّم، ومشاريع جانبية غريبة أحياناً — لشركات ناشئة وستوديوهات في الخليج وأوروبا.",
      "يقع عملي عند خط التماس بين التصميم والهندسة: طباعة تتنفّس، وحركة لها معنى، وكود يصمد تحت الضغط.",
    ],
    stats: [
      { value: "+٨", label: "سنوات من العمل" },
      { value: "+٤٠", label: "منتجاً أُطلق" },
      { value: "١٢", label: "لغة (برمجية)" },
    ],
  },
  skills: {
    eyebrow: "القدرات",
    title: "أدوات مختارة بعناية.",
    groups: [
      {
        name: "هندسة",
        items: ["React 19", "TypeScript", "TanStack Start", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        name: "تصميم",
        items: ["أنظمة تصميم", "طباعة", "Figma", "نماذج أولية", "هوية بصرية"],
      },
      {
        name: "منصّات",
        items: ["Postgres", "Supabase", "Cloudflare", "Vercel", "وظائف الحافة"],
      },
    ],
  },
  projects: {
    eyebrow: "أعمال مختارة",
    title: "مشاريع حديثة.",
    all: "الكل",
    view: "تفاصيل المشروع",
    items: [
      {
        slug: "atlas",
        category: "منتج",
        name: "أطلس",
        summary: "مساحة عمل لفِرَق البحث الطويل. صُمّم وطُوّر من الألف إلى الياء.",
        year: "٢٠٢٥",
        role: "تصميم وهندسة",
        body: "استبدل أطلس كومةً من الملاحظات وأدوات الاستشهاد والمستندات المشتركة بسطح واحد مدروس طباعياً. ركّزنا على راحة القراءة وكثافة الاستشهاد وإحساس المؤشّر عند ١٢٠ هرتز.",
      },
      {
        slug: "kalima",
        category: "هوية",
        name: "كلمة",
        summary: "منصّة نشر ثنائية اللغة للكتّاب العرب، تنطلق من العربية أولاً.",
        year: "٢٠٢٤",
        role: "قائد تقني",
        body: "تنشر كلمة مقالات بالعربية والإنجليزية بلغة بصرية مشتركة. كان أصعب جزء جعل خط لاتيني سيريفي و«طجوال» يغنّيان معاً في كلّ وزن وحجم.",
      },
      {
        slug: "loop",
        category: "منتج",
        name: "لووب",
        summary: "أداة جدولة هادئة لفِرَق من شخصَين. بلا إشعارات، بقصدٍ كامل.",
        year: "٢٠٢٤",
        role: "مهندس مؤسّس",
        body: "تقلّل لووب من ذهاب وإياب الجدولة بإلغاء الإشعارات تماماً. تعيش الحالة في سجلّ مشترك للإضافة فقط، والواجهة معظمها هامش.",
      },
      {
        slug: "studio-site",
        category: "موقع",
        name: "موقع ستوديو",
        summary: "موقع لستوديو معماري في جدّة. طباعة قديمة تلتقي بالويب الحديث.",
        year: "٢٠٢٣",
        role: "تصميم وهندسة",
        body: "بنينا موقعاً تسويقياً خفيف الإدارة بإيقاع تحريري ووسائط كسولة، وتذييل يقوم مقام شعار الكتاب.",
      },
    ],
  },
  experience: {
    eyebrow: "الخبرة",
    title: "أين عملت.",
    items: [
      {
        period: "٢٠٢٣ — الآن",
        role: "مهندس منتجات أوّل",
        company: "عمل حر",
        body: "أعمل مع المؤسّسين والستوديوهات في إطلاق المنتجات، وأنظمة التصميم، والواجهات التسويقية ثنائية اللغة.",
      },
      {
        period: "٢٠٢٠ — ٢٠٢٣",
        role: "قائد تقني",
        company: "نورثويند لابز",
        body: "قُدتُ الواجهة الأمامية لفريق من ١٤ شخصاً. أطلقتُ نظام تصميم استُخدم في ستة منتجات، وموقع توثيق بجودة طباعية.",
      },
      {
        period: "٢٠١٧ — ٢٠٢٠",
        role: "مهندس منتجات",
        company: "فاوندري",
        body: "بنيتُ واجهات تسويقية ولوحات تحكّم لشركات ناشئة. أوّل تجربة لي مع منتجات تنطلق من اليمين إلى اليسار.",
      },
    ],
  },
  education: {
    eyebrow: "التعليم",
    title: "أين تعلّمت.",
    items: [
      {
        period: "٢٠١٥ — ٢٠١٧",
        degree: "ماجستير تفاعل الإنسان والحاسوب",
        school: "جامعة إدنبرة",
      },
      {
        period: "٢٠١١ — ٢٠١٥",
        degree: "بكالوريوس علوم الحاسب",
        school: "جامعة الملك فهد للبترول والمعادن",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل",
    title: "حدّثني عن العمل.",
    lede: "أتعاون مع حفنة من المشاريع كلّ سنة. اكتب لي رسالة قصيرة عمّا تبنيه ومدى زمنه الواقعي.",
    name: "اسمك",
    email: "البريد الإلكتروني",
    message: "ماذا تبني؟",
    send: "إرسال",
    sending: "جارٍ الإرسال…",
    sent: "شكراً — سأردّ خلال يومَي عمل.",
    error: "حدث خطأ. أعد المحاولة أو راسلني مباشرة.",
    direct: "أو راسل مباشرة:",
  },
  footer: {
    colophon: "بخطّ Instrument Serif و Work Sans · وTajawal للعربية. مبنيّ بـ React وTanStack Start وكثير من الهامش.",
    rights: "© ٢٠٢٦ — جميع الحقوق محفوظة.",
  },
  toggle: {
    theme: "تبديل المظهر",
    locale: "تبديل اللغة",
    light: "فاتح",
    dark: "داكن",
  },
  project: {
    back: "كل الأعمال",
    role: "الدور",
    year: "السنة",
    category: "التصنيف",
    notFound: "المشروع غير موجود.",
  },
};

export const dictionaries = { en, ar };