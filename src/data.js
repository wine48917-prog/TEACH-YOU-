
export const courses = [
  {
    id: "html-start",
    title: "HTML من الصفر",
    titleEn: "HTML From Zero",
    description: "تعلم بناء هيكل صفحات الويب خطوة بخطوة.",
    descriptionEn: "Learn to structure web pages step by step.",
    level: "beginner",
    category: "Web Development",
    duration: "3 ساعات",
    icon: "🌐",
    lessons: [
      {
        id: "html-1",
        title: "ما هي HTML؟",
        titleEn: "What is HTML?",
        duration: "12 دقيقة",
        content: "HTML هي لغة توصيف تُستخدم لبناء هيكل صفحات الويب. كل صفحة تتكون من عناصر مثل العناوين والفقرات والصور والروابط.",
        code: `<!doctype html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>أول صفحة</title>
</head>
<body>
  <h1>أهلاً بك في TEACH YOU</h1>
  <p>هذه أول صفحة ويب لي.</p>
</body>
</html>`
      },
      {
        id: "html-2",
        title: "العناوين والفقرات",
        titleEn: "Headings & Paragraphs",
        duration: "18 دقيقة",
        content: "استخدم h1 إلى h6 للعناوين، و p للفقرات. اجعل لكل صفحة عنواناً رئيسياً واضحاً.",
        code: `<h1>عنوان رئيسي</h1>
<h2>عنوان فرعي</h2>
<p>هذه فقرة نصية.</p>`
      },
      {
        id: "html-3",
        title: "الروابط والصور",
        titleEn: "Links & Images",
        duration: "20 دقيقة",
        content: "عنصر a ينشئ رابطاً، وعنصر img يعرض صورة. اكتب وصفاً مناسباً داخل alt للصورة.",
        code: `<a href="https://example.com">افتح الموقع</a>
<img src="photo.jpg" alt="وصف الصورة">`
      }
    ]
  },
  {
    id: "css-start",
    title: "CSS وتصميم الواجهات",
    titleEn: "CSS & UI Design",
    description: "حوّل صفحاتك إلى واجهات جميلة ومتجاوبة.",
    descriptionEn: "Turn your pages into beautiful responsive interfaces.",
    level: "beginner",
    category: "Web Development",
    duration: "4 ساعات",
    icon: "🎨",
    lessons: [
      {
        id: "css-1",
        title: "مقدمة CSS",
        titleEn: "CSS Introduction",
        duration: "15 دقيقة",
        content: "CSS مسؤولة عن الألوان والخطوط والمسافات وتخطيط عناصر الصفحة. يمكن ربطها بملف خارجي باستخدام link.",
        code: `body {
  background: #09090d;
  color: white;
  font-family: Arial;
}
.card {
  padding: 24px;
  border-radius: 16px;
}`
      },
      {
        id: "css-2",
        title: "الألوان والمسافات",
        titleEn: "Colors & Spacing",
        duration: "20 دقيقة",
        content: "استخدم color للنص وbackground للخلفية، وmargin للمسافة الخارجية وpadding للمسافة الداخلية.",
        code: `.button {
  color: white;
  background: #8b5cf6;
  padding: 12px 20px;
  border-radius: 12px;
}`
      },
      {
        id: "css-3",
        title: "Flexbox",
        titleEn: "Flexbox Layout",
        duration: "25 دقيقة",
        content: "Flexbox طريقة مرنة لترتيب العناصر في صف أو عمود والتحكم في المحاذاة والمسافات.",
        code: `.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}`
      }
    ]
  },
  {
    id: "js-start",
    title: "JavaScript للمبتدئين",
    titleEn: "JavaScript for Beginners",
    description: "ابدأ البرمجة والتفاعل داخل صفحات الويب.",
    descriptionEn: "Start programming and adding interaction to web pages.",
    level: "beginner",
    category: "Programming",
    duration: "6 ساعات",
    icon: "⚡",
    lessons: [
      {
        id: "js-1",
        title: "المتغيرات",
        titleEn: "Variables",
        duration: "18 دقيقة",
        content: "المتغير مكان لتخزين قيمة. استخدم const للقيم الثابتة و let للقيم التي ستتغير.",
        code: `const platform = 'TEACH YOU';
let points = 0;
points = points + 10;
console.log(platform, points);`
      },
      {
        id: "js-2",
        title: "الشروط",
        titleEn: "Conditions",
        duration: "20 دقيقة",
        content: "تسمح if بتنفيذ كود عند تحقق شرط معين، ويمكن استخدام else للحالة الأخرى.",
        code: `const score = 85;
if (score >= 50) {
  console.log('ناجح');
} else {
  console.log('حاول مرة أخرى');
}`
      },
      {
        id: "js-3",
        title: "الدوال",
        titleEn: "Functions",
        duration: "25 دقيقة",
        content: "الدالة تجمع تعليمات يمكن إعادة استخدامها، ويمكنها استقبال مدخلات وإرجاع نتيجة.",
        code: `function greet(name) {
  return \`أهلاً \${name}\`;
}
console.log(greet('مطور'));`
      }
    ]
  }
];

export const tracks = [
  {
    title: "تطوير الويب",
    titleEn: "Web Development",
    desc: "من أول صفحة HTML إلى واجهة متكاملة.",
    descEn: "From your first HTML page to a complete interface.",
    icon: "🌐",
    count: "3 كورسات"
  },
  {
    title: "أساسيات البرمجة",
    titleEn: "Programming Basics",
    desc: "افهم التفكير البرمجي والمنطق وحل المشكلات.",
    descEn: "Understand programming logic and problem solving.",
    icon: "🧠",
    count: "قريباً"
  },
  {
    title: "تطوير التطبيقات",
    titleEn: "App Development",
    desc: "تعرف على أساسيات بناء تطبيقات عملية.",
    descEn: "Explore the foundations of building apps.",
    icon: "📱",
    count: "قريباً"
  }
];
