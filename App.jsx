import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, LayoutDashboard, Compass, Trophy, Code2, UserRound, Settings,
  Search, Menu, X, Moon, Sun, Globe2, LogOut, ChevronLeft, ChevronRight,
  Play, CheckCircle2, Clock3, Flame, Target, Sparkles, LockKeyhole,
  Mail, Eye, EyeOff, ArrowUpRight, PanelLeftClose, GraduationCap,
  CircleHelp, Save, Plus, Trash2, ShieldCheck, Users, BarChart3
} from "lucide-react";
import { courses, tracks } from "./data";
import { supabase, isSupabaseConfigured } from "./supabase";

const translations = {
  ar: {
    home:"الرئيسية", courses:"الكورسات", paths:"المسارات", progress:"إنجازي", playground:"ساحة التجربة",
    profile:"حسابي", admin:"لوحة المالك", settings:"الإعدادات", welcome:"ابدأ رحلتك في البرمجة",
    hero:"من الصفر إلى مطور", heroSub:"تعلم خطوة بخطوة، طبّق بنفسك، وابنِ مشاريعك الأولى بثقة.",
    explore:"استكشف الكورسات", continue:"تابع التعلم", featured:"ابدأ من هنا", featuredSub:"مسارات واضحة ومحتوى عملي يناسب المبتدئين.",
    allCourses:"كل الكورسات", viewAll:"عرض الكل", beginner:"مبتدئ", intermediate:"متوسط", advanced:"متقدم",
    lessons:"دروس", duration:"المدة", start:"ابدأ التعلم", completed:"مكتمل", inProgress:"قيد التعلم",
    yourProgress:"تقدمك", completedLessons:"الدروس المكتملة", learningHours:"ساعات التعلم", streak:"أيام الاستمرار",
    recent:"تابع من حيث توقفت", noProgress:"لم تبدأ أي درس بعد. اختر كورساً وابدأ رحلتك!",
    search:"ابحث عن كورس أو درس...", login:"تسجيل الدخول", signup:"إنشاء حساب", email:"البريد الإلكتروني",
    password:"كلمة المرور", name:"الاسم", logout:"تسجيل الخروج", guest:"وضع تجريبي", demo:"أنت تستخدم المنصة في الوضع التجريبي. اربط Supabase لتفعيل الحسابات والمزامنة.",
    lesson:"الدرس", markDone:"إنهاء الدرس", next:"الدرس التالي", previous:"السابق", lessonContent:"شرح الدرس",
    codeExample:"مثال عملي", tracks:"المسارات التعليمية", tracksSub:"اختار الطريق المناسب لهدفك.",
    quiz:"اختبر فهمك", quizQuestion:"ما وظيفة HTML الأساسية؟", answer1:"تنسيق ألوان الصفحة", answer2:"بناء هيكل الصفحة", answer3:"إدارة قاعدة البيانات",
    submit:"تحقق من الإجابة", correct:"إجابة صحيحة! أحسنت.", wrong:"ليست الإجابة الصحيحة، حاول مرة أخرى.",
    playgroundTitle:"ساحة التجربة", playgroundSub:"اكتب HTML وCSS وJavaScript وشاهد النتيجة مباشرة.",
    html:"HTML", css:"CSS", js:"JavaScript", run:"تشغيل", reset:"إعادة ضبط", result:"النتيجة",
    profileTitle:"ملفك الشخصي", profileSub:"تابع رحلتك التعليمية وإنجازاتك.", save:"حفظ التغييرات",
    adminTitle:"لوحة المالك", adminSub:"نظرة عامة على نشاط المنصة.", users:"المستخدمون", students:"الطلاب",
    courseManagement:"إدارة الكورسات", addCourse:"إضافة كورس", title:"عنوان الكورس", description:"الوصف",
    level:"المستوى", publish:"نشر الكورس", published:"منشور", draft:"مسودة", noUsers:"لا توجد بيانات مستخدمين بعد.",
    language:"اللغة", appearance:"المظهر", dark:"داكن", light:"فاتح", account:"الحساب", loginRequired:"سجّل الدخول لحفظ تقدمك ومزامنته.",
    signInFirst:"سجّل الدخول أولاً", authError:"تعذر إتمام العملية. تحقق من البيانات وإعدادات Supabase.",
    signedIn:"تم تسجيل الدخول بنجاح", signedUp:"تم إنشاء الحساب. إذا كان تأكيد البريد مفعلاً، راجع بريدك.",
    empty:"لا توجد نتائج مطابقة.", levelLabel:"المستوى", category:"التصنيف", min:"دقيقة", points:"نقطة",
    welcomeBack:"أهلاً بعودتك", createAccount:"أنشئ حسابك وابدأ التعلم", already:"لديك حساب بالفعل؟", noAccount:"ليس لديك حساب؟",
    passwordHint:"6 أحرف على الأقل", backHome:"العودة للرئيسية", ownerOnly:"هذه الصفحة متاحة للمالك فقط.",
    stats:"إحصائيات التعلم", saved:"تم الحفظ", footer:"تعلم • طبّق • أتقن", noCourse:"الكورس غير موجود",
    lessonList:"محتوى الكورس", startNow:"ابدأ الآن", completion:"نسبة الإكمال", xp:"نقاط الخبرة"
  },
  en: {
    home:"Home", courses:"Courses", paths:"Learning paths", progress:"My progress", playground:"Playground",
    profile:"Profile", admin:"Owner dashboard", settings:"Settings", welcome:"Start your coding journey",
    hero:"From Zero to Developer", heroSub:"Learn step by step, practice by yourself, and build your first projects with confidence.",
    explore:"Explore courses", continue:"Continue learning", featured:"Start here", featuredSub:"Clear learning paths and practical content for beginners.",
    allCourses:"All courses", viewAll:"View all", beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced",
    lessons:"Lessons", duration:"Duration", start:"Start learning", completed:"Completed", inProgress:"In progress",
    yourProgress:"Your progress", completedLessons:"Completed lessons", learningHours:"Learning hours", streak:"Day streak",
    recent:"Continue where you left off", noProgress:"You haven't started a lesson yet. Pick a course and begin!",
    search:"Search courses or lessons...", login:"Log in", signup:"Create account", email:"Email",
    password:"Password", name:"Name", logout:"Log out", guest:"Demo mode", demo:"You're using demo mode. Connect Supabase to enable accounts and cloud sync.",
    lesson:"Lesson", markDone:"Mark as complete", next:"Next lesson", previous:"Previous", lessonContent:"Lesson content",
    codeExample:"Code example", tracks:"Learning paths", tracksSub:"Choose the path that matches your goal.",
    quiz:"Check your understanding", quizQuestion:"What is the main purpose of HTML?", answer1:"Style page colors", answer2:"Structure a web page", answer3:"Manage a database",
    submit:"Check answer", correct:"Correct answer! Well done.", wrong:"Not quite. Try again.",
    playgroundTitle:"Code playground", playgroundSub:"Write HTML, CSS and JavaScript and preview the result live.",
    html:"HTML", css:"CSS", js:"JavaScript", run:"Run", reset:"Reset", result:"Preview",
    profileTitle:"Your profile", profileSub:"Track your learning journey and achievements.", save:"Save changes",
    adminTitle:"Owner dashboard", adminSub:"An overview of platform activity.", users:"Users", students:"Students",
    courseManagement:"Course management", addCourse:"Add course", title:"Course title", description:"Description",
    level:"Level", publish:"Publish course", published:"Published", draft:"Draft", noUsers:"No user data yet.",
    language:"Language", appearance:"Appearance", dark:"Dark", light:"Light", account:"Account", loginRequired:"Log in to save and sync your progress.",
    signInFirst:"Please log in first", authError:"Could not complete the action. Check your details and Supabase settings.",
    signedIn:"Logged in successfully", signedUp:"Account created. Check your email if confirmation is enabled.",
    empty:"No matching results.", levelLabel:"Level", category:"Category", min:"min", points:"XP",
    welcomeBack:"Welcome back", createAccount:"Create an account and start learning", already:"Already have an account?", noAccount:"Don't have an account?",
    passwordHint:"At least 6 characters", backHome:"Back home", ownerOnly:"This page is for the owner only.",
    stats:"Learning statistics", saved:"Saved", footer:"Learn • Practice • Master", noCourse:"Course not found",
    lessonList:"Course content", startNow:"Start now", completion:"Completion", xp:"Experience points"
  }
};

const Icon = ({name, size=18}) => {
  const map = {home:LayoutDashboard, courses:BookOpen, paths:Compass, progress:BarChart3, playground:Code2, profile:UserRound, admin:ShieldCheck, settings:Settings};
  const C = map[name] || Sparkles;
  return <C size={size}/>;
};

function App() {
  const [lang, setLang] = useState(localStorage.getItem("ty_lang") || "ar");
  const [theme, setTheme] = useState(localStorage.getItem("ty_theme") || "dark");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const t = translations[lang];
  const rtl = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ty_lang", lang);
    localStorage.setItem("ty_theme", theme);
  }, [lang, theme, rtl]);

  const notify = (message) => { setToast(message); setTimeout(() => setToast(""), 2800); };

  const loadProfile = async (sessionUser) => {
    if (!sessionUser || !supabase) return;
    const { data } = await supabase.from("ty_profiles").select("*").eq("id", sessionUser.id).maybeSingle();
    setProfile(data || { id: sessionUser.id, email: sessionUser.email, role: "student", full_name: "" });
    const { data: rows } = await supabase.from("ty_lesson_progress").select("lesson_id,completed,progress").eq("user_id", sessionUser.id);
    if (rows) {
      const next = {};
      rows.forEach(r => next[r.lesson_id] = { completed: r.completed, progress: r.progress });
      setProgress(next);
    }
  };

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({data}) => {
      setUser(data.session?.user || null);
      if (data.session?.user) loadProfile(data.session.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user || null;
      setUser(nextUser);
      if (nextUser) setTimeout(() => loadProfile(nextUser), 0);
      else { setProfile(null); setProgress({}); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const allLessons = courses.flatMap(c => c.lessons.map(l => ({...l, courseId:c.id, courseTitle:c.title})));
  const completedCount = Object.values(progress).filter(x => x.completed).length;
  const totalLessons = allLessons.length;
  const percent = Math.round(completedCount / Math.max(totalLessons,1) * 100);
  const filteredCourses = useMemo(() => courses.filter(c => `${c.title} ${c.titleEn} ${c.description} ${c.descriptionEn}`.toLowerCase().includes(search.toLowerCase())), [search]);

  const openCourse = (course) => { setSelectedCourse(course); setPage("course"); setSidebarOpen(false); };
  const openLesson = (course, lesson) => { setSelectedCourse(course); setSelectedLesson(lesson); setPage("lesson"); setSidebarOpen(false); };
  const markComplete = async () => {
    if (!selectedLesson) return;
    const next = {...progress, [selectedLesson.id]: {completed:true, progress:100}};
    setProgress(next);
    if (user && supabase) {
      const { error } = await supabase.from("ty_lesson_progress").upsert({
        user_id:user.id, lesson_id:selectedLesson.id, completed:true, progress:100, updated_at:new Date().toISOString()
      }, {onConflict:"user_id,lesson_id"});
      if (error) notify(error.message);
      else notify(t.saved);
    } else notify(t.saved + " · " + t.guest);
  };

  const authenticate = async (email, password, name) => {
    if (!supabase) { notify(t.demo); return; }
    setLoading(true);
    let result;
    if (authMode === "signup") {
      result = await supabase.auth.signUp({email, password, options:{data:{full_name:name}}});
    } else result = await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if (result.error) notify(result.error.message);
    else {
      notify(authMode === "signup" ? t.signedUp : t.signedIn);
      if (result.data.session) setAuthOpen(false);
    }
  };

  const nav = [
    ["home",t.home],["courses",t.courses],["paths",t.paths],["progress",t.progress],["playground",t.playground]
  ];
  const secondary = [["profile",t.profile], ...(profile?.role === "owner" ? [["admin",t.admin]] : []), ["settings",t.settings]];

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark">T</div><div><b>TEACH YOU</b><small>LEARN · BUILD · GROW</small></div><button className="icon-btn mobile-close" onClick={()=>setSidebarOpen(false)}><X/></button></div>
      <div className="side-label">{rtl ? "القائمة الرئيسية" : "MAIN MENU"}</div>
      <nav>{nav.map(([id,label])=><button key={id} className={`nav-item ${page===id || (id==="courses" && ["course","lesson"].includes(page)) ? "active":""}`} onClick={()=>{setPage(id);setSidebarOpen(false)}}><Icon name={id}/><span>{label}</span>{id==="progress" && completedCount>0 && <i className="nav-count">{completedCount}</i>}</button>)}</nav>
      <div className="side-label second-label">{rtl ? "مساحتك" : "YOUR SPACE"}</div>
      <nav>{secondary.map(([id,label])=><button key={id} className={`nav-item ${page===id?"active":""}`} onClick={()=>{setPage(id);setSidebarOpen(false)}}><Icon name={id}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom">
        <div className="side-help"><div className="help-icon"><Sparkles size={17}/></div><b>{rtl?"رحلتك تبدأ بخطوة":"Your journey starts here"}</b><p>{rtl?"تعلم شيئاً جديداً كل يوم.":"Learn something new every day."}</p></div>
        {user ? <button className="user-mini" onClick={()=>setPage("profile")}><div className="avatar">{(profile?.full_name || user.email || "U").slice(0,1).toUpperCase()}</div><div className="user-mini-text"><b>{profile?.full_name || user.email?.split("@")[0]}</b><small>{profile?.role==="owner"?"OWNER":"STUDENT"}</small></div><ChevronLeft size={16}/></button> : <button className="login-side" onClick={()=>setAuthOpen(true)}><LockKeyhole size={16}/>{t.login}</button>}
      </div>
    </aside>
    {sidebarOpen && <div className="mobile-overlay" onClick={()=>setSidebarOpen(false)} />}
    <main className="main-area">
      <header className="topbar">
        <div className="top-left"><button className="icon-btn menu-toggle" onClick={()=>setSidebarOpen(true)}><Menu/></button><div className="breadcrumb">{t[page] || (page==="course"?t.courses:page==="lesson"?t.lesson:t.home)}</div></div>
        <div className="top-actions">
          <div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/><kbd>⌘ K</kbd></div>
          <button className="icon-btn" title={t.language} onClick={()=>setLang(lang==="ar"?"en":"ar")}><Globe2 size={18}/><span className="lang-code">{lang.toUpperCase()}</span></button>
          <button className="icon-btn" title={t.appearance} onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
          <button className="top-avatar" onClick={()=>user?setPage("profile"):setAuthOpen(true)}>{user?(profile?.full_name||user.email||"U").slice(0,1).toUpperCase():<UserRound size={18}/>}</button>
        </div>
      </header>
      <div className="page-wrap">
        <AnimatePresence mode="wait">
          <motion.div key={page+(selectedLesson?.id||"")} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}>
            {page==="home" && <Home t={t} rtl={rtl} progress={progress} percent={percent} completedCount={completedCount} openCourse={openCourse} setPage={setPage} user={user}/>}
            {page==="courses" && <Courses t={t} rtl={rtl} list={filteredCourses} openCourse={openCourse}/>}
            {page==="paths" && <Paths t={t} rtl={rtl} openCourse={openCourse}/>}
            {page==="course" && <CoursePage t={t} rtl={rtl} course={selectedCourse} progress={progress} openLesson={openLesson} back={()=>setPage("courses")}/>}
            {page==="lesson" && <LessonPage t={t} rtl={rtl} course={selectedCourse} lesson={selectedLesson} progress={progress} markComplete={markComplete} back={()=>setPage("course")} next={()=>{const i=selectedCourse.lessons.findIndex(x=>x.id===selectedLesson.id); if(selectedCourse.lessons[i+1]) setSelectedLesson(selectedCourse.lessons[i+1]); else setPage("course");}}/>}
            {page==="progress" && <ProgressPage t={t} rtl={rtl} progress={progress} percent={percent} completedCount={completedCount} totalLessons={totalLessons} openCourse={openCourse}/>}
            {page==="playground" && <Playground t={t} rtl={rtl}/>}
            {page==="profile" && <Profile t={t} rtl={rtl} user={user} profile={profile} setProfile={setProfile} setAuthOpen={setAuthOpen} notify={notify}/>}
            {page==="settings" && <SettingsPage t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>}
            {page==="admin" && <AdminPage t={t} rtl={rtl} profile={profile} user={user} notify={notify}/>}
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="footer"><span>© 2026 TEACH YOU</span><span>{t.footer}</span><span>MADE FOR BEGINNERS</span></footer>
    </main>
    <AnimatePresence>{authOpen && <AuthModal t={t} mode={authMode} setMode={setAuthMode} close={()=>setAuthOpen(false)} submit={authenticate} loading={loading}/>}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div className="toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}><CheckCircle2 size={17}/>{toast}</motion.div>}</AnimatePresence>
  </div>;
}

function Home({t,rtl,progress,percent,completedCount,openCourse,setPage,user}) {
  const recent = courses.flatMap(c=>c.lessons.map(l=>({c,l}))).find(x=>progress[x.l.id]&&!progress[x.l.id].completed);
  return <div className="stack-xl">
    <section className="hero-panel">
      <div className="hero-glow"/><div className="hero-content">
        <div className="eyebrow"><span className="live-dot"/> {rtl?"منصة تعليمية للمبتدئين":"A LEARNING PLATFORM FOR BEGINNERS"}</div>
        <h1>{t.hero}<br/><em>{rtl?"ابدأ رحلتك اليوم":"Start your journey today"}</em></h1>
        <p>{t.heroSub}</p>
        <div className="hero-actions"><button className="btn-primary" onClick={()=>setPage("courses")}>{t.explore}<ArrowUpRight size={17}/></button><button className="btn-ghost" onClick={()=>setPage("paths")}>{t.tracks}<ChevronLeft size={16}/></button></div>
      </div>
      <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-core"><Code2 size={54}/><span>TY</span></div><div className="float-chip chip-one"><span className="chip-dot purple"/> HTML</div><div className="float-chip chip-two"><span className="chip-dot white"/> CSS</div><div className="float-chip chip-three"><span className="chip-dot blue"/> JS</div></div>
      <div className="hero-index">01 <span/> 03</div>
    </section>
    <section className="stats-grid">
      <Stat icon={<BookOpen/>} label={t.completedLessons} value={`${completedCount}/${courses.reduce((n,c)=>n+c.lessons.length,0)}`} note={rtl?"استمر في التقدم":"Keep moving forward"}/>
      <Stat icon={<Target/>} label={t.yourProgress} value={`${percent}%`} note={rtl?"من إجمالي الدروس":"Of all lessons"}/>
      <Stat icon={<Flame/>} label={t.xp} value={completedCount*50} note={rtl?"اكسب المزيد بالتعلم":"Earn more by learning"}/>
      <Stat icon={<Clock3/>} label={t.learningHours} value={completedCount*0.3+"h"} note={rtl?"وقتك في التعلم مهم":"Every minute counts"}/>
    </section>
    <section className="section-block">
      <div className="section-heading"><div><div className="eyebrow purple-text">{t.featured}</div><h2>{t.allCourses}</h2><p>{t.featuredSub}</p></div><button className="text-link" onClick={()=>setPage("courses")}>{t.viewAll}<ArrowUpRight size={16}/></button></div>
      <div className="course-grid">{courses.map((c,i)=><CourseCard key={c.id} course={c} t={t} rtl={rtl} index={i} progress={progress} onClick={()=>openCourse(c)}/>)}</div>
    </section>
    <section className="continue-panel">
      <div className="continue-icon"><GraduationCap size={25}/></div><div className="continue-copy"><span className="eyebrow">{t.recent}</span><h3>{recent? (rtl?recent.l.title:recent.l.titleEn):t.noProgress}</h3><p>{recent?(rtl?recent.c.title:recent.c.titleEn):t.heroSub}</p></div><button className="btn-primary small" onClick={()=>recent?openCourse(recent.c):setPage("courses")}>{recent?t.continue:t.startNow}<ArrowUpRight size={16}/></button>
    </section>
  </div>;
}
function Stat({icon,label,value,note}) {return <div className="stat-card"><div className="stat-top"><span className="stat-icon">{icon}</span><span className="stat-trend">↗</span></div><strong>{value}</strong><b>{label}</b><small>{note}</small></div>}
function CourseCard({course,t,rtl,index,progress,onClick}) {
  const done=course.lessons.filter(l=>progress[l.id]?.completed).length, pct=Math.round(done/course.lessons.length*100);
  return <motion.button className="course-card" onClick={onClick} whileHover={{y:-5}} transition={{duration:.2}}>
    <div className={`course-cover cover-${index}`}><span className="course-emoji">{course.icon}</span><span className="cover-tag">{t.beginner}</span><span className="cover-number">0{index+1}</span></div>
    <div className="course-info"><div className="course-meta"><span>{course.category}</span><span><Clock3 size={13}/> {course.duration}</span></div><h3>{rtl?course.title:course.titleEn}</h3><p>{rtl?course.description:course.descriptionEn}</p><div className="course-bottom"><span>{course.lessons.length} {t.lessons}</span><span>{pct}%</span></div><div className="progress-track"><i style={{width:pct+"%"}}/></div></div>
  </motion.button>;
}
function Courses({t,rtl,list,openCourse}) {
  return <div className="stack-lg"><PageHeading eyebrow="LEARNING LIBRARY" title={t.allCourses} desc={rtl?"اختر كورساً وابدأ التعلم بالسرعة التي تناسبك.":"Choose a course and learn at your own pace."}/>{list.length?<div className="course-grid">{list.map((c,i)=><CourseCard key={c.id} course={c} t={t} rtl={rtl} index={i%3} progress={{}} onClick={()=>openCourse(c)}/>)}</div>:<Empty text={t.empty}/>}</div>;
}
function Paths({t,rtl,openCourse}) {
  return <div className="stack-lg"><PageHeading eyebrow="YOUR ROADMAP" title={t.tracks} desc={t.tracksSub}/><div className="path-grid">{tracks.map((p,i)=><div className="path-card" key={p.title}><div className="path-top"><span className="path-icon">{p.icon}</span><span className="path-num">0{i+1}</span></div><h3>{rtl?p.title:p.titleEn}</h3><p>{rtl?p.desc:p.descEn}</p><div className="path-foot"><span>{rtl?p.count:(i===0?"3 courses":"Coming soon")}</span><button onClick={()=>openCourse(courses[0])}>{t.start}<ArrowUpRight size={15}/></button></div></div>)}</div></div>;
}
function CoursePage({t,rtl,course,progress,openLesson,back}) {
  if(!course) return <Empty text={t.noCourse}/>;
  const done=course.lessons.filter(l=>progress[l.id]?.completed).length;
  return <div className="stack-lg"><button className="back-link" onClick={back}><ChevronRight size={16}/>{t.allCourses}</button><div className="course-detail-hero"><div><span className="eyebrow">{course.category} · {t.beginner}</span><h1>{rtl?course.title:course.titleEn}</h1><p>{rtl?course.description:course.descriptionEn}</p><div className="detail-meta"><span><BookOpen size={15}/>{course.lessons.length} {t.lessons}</span><span><Clock3 size={15}/>{course.duration}</span></div></div><div className="detail-visual">{course.icon}</div></div><div className="content-panel"><div className="section-heading compact"><div><h2>{t.lessonList}</h2><p>{done} / {course.lessons.length} {t.completedLessons}</p></div><span className="completion-pill">{Math.round(done/course.lessons.length*100)}%</span></div><div className="lesson-list">{course.lessons.map((l,i)=><button className="lesson-row" key={l.id} onClick={()=>openLesson(course,l)}><span className={`lesson-index ${progress[l.id]?.completed?"done":""}`}>{progress[l.id]?.completed?<CheckCircle2 size={18}/>:String(i+1).padStart(2,"0")}</span><span className="lesson-row-copy"><b>{rtl?l.title:l.titleEn}</b><small><Clock3 size={13}/>{l.duration}</small></span><span className="lesson-state">{progress[l.id]?.completed?t.completed:t.start}<ChevronLeft size={16}/></span></button>)}</div></div></div>;
}
function LessonPage({t,rtl,course,lesson,progress,markComplete,back,next}) {
  const [answer,setAnswer]=useState("");
  const [checked,setChecked]=useState(false);
  if(!lesson||!course) return <Empty text={t.noCourse}/>;
  const done=progress[lesson.id]?.completed;
  return <div className="lesson-layout"><article className="lesson-main"><button className="back-link" onClick={back}><ChevronRight size={16}/>{rtl?course.title:course.titleEn}</button><div className="lesson-title"><span className="eyebrow">{t.lesson} · {rtl?course.title:course.titleEn}</span><h1>{rtl?lesson.title:lesson.titleEn}</h1><span className="duration"><Clock3 size={14}/>{lesson.duration}</span></div><div className="content-panel lesson-body"><h2>{t.lessonContent}</h2><p>{lesson.content}</p><h2>{t.codeExample}</h2><pre className="code-block"><code>{lesson.code.replaceAll("\\n","\n")}</code><span>EXAMPLE</span></pre><div className="quiz-box"><div className="quiz-head"><CircleHelp size={19}/><b>{t.quiz}</b></div><p>{t.quizQuestion}</p>{[["1",t.answer1],["2",t.answer2],["3",t.answer3]].map(([v,label])=><label className={`quiz-option ${answer===v?"selected":""}`} key={v}><input type="radio" name="quiz" value={v} checked={answer===v} onChange={()=>{setAnswer(v);setChecked(false)}}/><span>{label}</span></label>)}{checked&&<div className={`quiz-feedback ${answer==="2"?"good":"bad"}`}>{answer==="2"?t.correct:t.wrong}</div>}<button className="btn-secondary" disabled={!answer} onClick={()=>setChecked(true)}>{t.submit}</button></div><div className="lesson-actions"><button className={`btn-primary ${done?"is-done":""}`} onClick={markComplete}>{done?<CheckCircle2 size={17}/>:<CheckCircle2 size={17}/ >}{done?t.completed:t.markDone}</button><button className="btn-ghost" onClick={next}>{t.next}<ChevronLeft size={16}/></button></div></div></article><aside className="lesson-sidebar"><span className="eyebrow">{t.lessonList}</span><h3>{rtl?course.title:course.titleEn}</h3>{course.lessons.map((l,i)=><div className={`mini-lesson ${l.id===lesson.id?"current":""}`} key={l.id}><span>{progress[l.id]?.completed?<CheckCircle2 size={16}/>:String(i+1).padStart(2,"0")}</span><div><b>{rtl?l.title:l.titleEn}</b><small>{l.duration}</small></div></div>)}</aside></div>;
}
function ProgressPage({t,rtl,progress,percent,completedCount,totalLessons,openCourse}) {
  return <div className="stack-lg"><PageHeading eyebrow="YOUR LEARNING ACTIVITY" title={t.yourProgress} desc={rtl?"كل خطوة صغيرة تقربك من هدفك.":"Every small step takes you closer to your goal."}/><div className="progress-overview"><div className="progress-ring" style={{"--progress":percent*3.6+"deg"}}><div><b>{percent}%</b><small>{t.completion}</small></div></div><div><span className="eyebrow">{t.stats}</span><h2>{completedCount} / {totalLessons} {t.completedLessons}</h2><p>{rtl?"استمر في التعلم، أنت تقوم بعمل رائع.":"Keep learning. You're doing great."}</p></div></div><div className="content-panel"><h2>{t.allCourses}</h2>{courses.map(c=>{const done=c.lessons.filter(l=>progress[l.id]?.completed).length;return <div className="progress-course" key={c.id}><div><b>{rtl?c.title:c.titleEn}</b><small>{done}/{c.lessons.length} {t.lessons}</small></div><div className="progress-track"><i style={{width:done/c.lessons.length*100+"%"}}/></div><span>{Math.round(done/c.lessons.length*100)}%</span><button className="icon-btn" onClick={()=>openCourse(c)}><ArrowUpRight size={16}/></button></div>})}</div></div>;
}
function Playground({t,rtl}) {
  const [html,setHtml]=useState("<h1>مرحباً بك في TEACH YOU</h1>\\n<p>اكتب الكود وشاهد النتيجة.</p>");
  const [css,setCss]=useState("body { font-family: Arial; padding: 24px; background: #111; color: white; }\\nh1 { color: #a78bfa; }");
  const [js,setJs]=useState("console.log('Hello TEACH YOU!');");
  const [tab,setTab]=useState("html");
  const [src,setSrc]=useState("");
  const run=()=>setSrc(`<!doctype html><html><head><style>${css}</style></head><body>${html}<script>try{${js}}catch(e){document.body.innerHTML += '<pre>'+e+'</pre>'}<\/script></body></html>`);
  const reset=()=>{setHtml("<h1>مرحباً بك في TEACH YOU</h1>\\n<p>اكتب الكود وشاهد النتيجة.</p>");setCss("body { font-family: Arial; padding: 24px; background: #111; color: white; }\\nh1 { color: #a78bfa; }");setJs("console.log('Hello TEACH YOU!');");setSrc("");};
  return <div className="stack-lg"><PageHeading eyebrow="PRACTICE LAB" title={t.playgroundTitle} desc={t.playgroundSub}/><div className="playground"><div className="editor-side"><div className="editor-tabs">{[["html",t.html],["css",t.css],["js",t.js]].map(([id,label])=><button className={tab===id?"active":""} onClick={()=>setTab(id)} key={id}>{label}</button>)}</div><div className="editor-label"><span className={`file-dot ${tab}`}/>{tab.toUpperCase()} <span>●</span></div><textarea className="code-editor" spellCheck="false" value={tab==="html"?html:tab==="css"?css:js} onChange={e=>tab==="html"?setHtml(e.target.value):tab==="css"?setCss(e.target.value):setJs(e.target.value)}/><div className="editor-actions"><button className="btn-ghost" onClick={reset}>{t.reset}</button><button className="btn-primary small" onClick={run}><Play size={15}/>{t.run}</button></div></div><div className="preview-side"><div className="preview-head"><span>{t.result}</span><span className="preview-live"><i/> LIVE PREVIEW</span></div>{src?<iframe title="preview" sandbox="allow-scripts" srcDoc={src}/>:<div className="preview-empty"><Code2 size={34}/><b>{rtl?"نتيجتك هتظهر هنا":"Your preview will appear here"}</b><span>{rtl?"اضغط تشغيل بعد كتابة الكود":"Press Run after writing your code"}</span></div>}</div></div></div>;
}
function Profile({t,rtl,user,profile,setProfile,setAuthOpen,notify}) {
  const [name,setName]=useState(profile?.full_name||"");
  useEffect(()=>setName(profile?.full_name||""),[profile]);
  const save=async()=>{if(!user||!supabase)return;const {error}=await supabase.from("ty_profiles").update({full_name:name}).eq("id",user.id);if(error)notify(error.message);else{setProfile({...profile,full_name:name});notify(t.saved)}};
  return <div className="stack-lg"><PageHeading eyebrow="PERSONAL SPACE" title={t.profileTitle} desc={t.profileSub}/>{user?<div className="profile-card"><div className="profile-avatar">{(profile?.full_name||user.email||"U").slice(0,1).toUpperCase()}</div><div className="profile-fields"><label>{t.name}<input value={name} onChange={e=>setName(e.target.value)} placeholder={t.name}/></label><label>{t.email}<input value={user.email||""} disabled/></label><label>{t.level}<input value={profile?.role==="owner"?"OWNER":"STUDENT"} disabled/></label><button className="btn-primary" onClick={save}><Save size={16}/>{t.save}</button></div></div>:<div className="empty-state"><LockKeyhole size={28}/><h3>{t.loginRequired}</h3><button className="btn-primary" onClick={()=>setAuthOpen(true)}>{t.login}</button></div>}</div>;
}
function SettingsPage({t,lang,setLang,theme,setTheme}) {
  return <div className="stack-lg"><PageHeading eyebrow="PREFERENCES" title={t.settings} desc={t.appearance+" · "+t.language}/><div className="content-panel settings-list"><div className="setting-row"><div><b>{t.language}</b><small>Arabic / English</small></div><div className="setting-options"><button className={lang==="ar"?"chosen":""} onClick={()=>setLang("ar")}>العربية</button><button className={lang==="en"?"chosen":""} onClick={()=>setLang("en")}>English</button></div></div><div className="setting-row"><div><b>{t.appearance}</b><small>{t.dark} / {t.light}</small></div><div className="setting-options"><button className={theme==="dark"?"chosen":""} onClick={()=>setTheme("dark")}><Moon size={15}/>{t.dark}</button><button className={theme==="light"?"chosen":""} onClick={()=>setTheme("light")}><Sun size={15}/>{t.light}</button></div></div></div></div>;
}
function AdminPage({t,rtl,profile,user,notify}) {
  const [users,setUsers]=useState([]);
  const [remoteCourses,setRemoteCourses]=useState([]);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [level,setLevel]=useState("beginner");
  const [published,setPublished]=useState(true);
  const [busy,setBusy]=useState(false);
  const load=async()=>{if(!supabase||profile?.role!=="owner")return;const [u,c]=await Promise.all([supabase.from("ty_profiles").select("id,email,full_name,role,created_at").order("created_at",{ascending:false}),supabase.from("ty_courses").select("*").order("created_at",{ascending:false})]);if(!u.error)setUsers(u.data||[]);if(!c.error)setRemoteCourses(c.data||[]);};
  useEffect(()=>{load()},[profile?.role]);
  const add=async()=>{if(!title.trim()||!supabase)return;setBusy(true);const {error}=await supabase.from("ty_courses").insert({title,description,level,is_published:published});setBusy(false);if(error)notify(error.message);else{notify(t.saved);setTitle("");setDescription("");load();}};
  if(profile?.role!=="owner")return <Empty text={t.ownerOnly}/>;
  return <div className="stack-lg"><PageHeading eyebrow="CONTROL CENTER" title={t.adminTitle} desc={t.adminSub}/><div className="stats-grid admin-stats"><Stat icon={<Users/>} label={t.users} value={users.length} note={t.students}/><Stat icon={<BookOpen/>} label={t.allCourses} value={remoteCourses.length} note="TEACH YOU"/><Stat icon={<ShieldCheck/>} label="OWNER" value="01" note="Access level"/></div><div className="content-panel"><h2>{t.courseManagement}</h2><div className="admin-form"><label>{t.title}<input value={title} onChange={e=>setTitle(e.target.value)} placeholder={t.title}/></label><label>{t.description}<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder={t.description}/></label><div className="form-inline"><label>{t.level}<select value={level} onChange={e=>setLevel(e.target.value)}><option value="beginner">{t.beginner}</option><option value="intermediate">{t.intermediate}</option><option value="advanced">{t.advanced}</option></select></label><label className="check-label"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)}/>{t.publish}</label></div><button className="btn-primary" onClick={add} disabled={busy||!title.trim()}><Plus size={16}/>{t.addCourse}</button></div><div className="admin-course-list">{remoteCourses.map(c=><div key={c.id}><span><b>{c.title}</b><small>{c.level}</small></span><span className={c.is_published?"status-live":"status-draft"}>{c.is_published?t.published:t.draft}</span></div>)}</div></div><div className="content-panel"><h2>{t.users} <span className="subtle-count">{users.length}</span></h2>{users.length?users.map(u=><div className="user-table-row" key={u.id}><div className="avatar">{(u.full_name||u.email||"U").slice(0,1).toUpperCase()}</div><div><b>{u.full_name||"—"}</b><small>{u.email}</small></div><span>{u.role}</span></div>):<Empty text={t.noUsers}/>}</div></div>;
}
function AuthModal({t,mode,setMode,close,submit,loading}) {
  const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [name,setName]=useState("");const [show,setShow]=useState(false);
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&close()}><motion.div className="auth-modal" initial={{y:25,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} exit={{y:15,opacity:0}}><button className="modal-close icon-btn" onClick={close}><X/></button><div className="auth-logo">T</div><span className="eyebrow">TEACH YOU ACCOUNT</span><h2>{mode==="login"?t.welcomeBack:t.createAccount}</h2><p>{mode==="login"?t.loginRequired:t.heroSub}</p><form onSubmit={e=>{e.preventDefault();submit(email,password,name)}}>{mode==="signup"&&<label>{t.name}<input value={name} onChange={e=>setName(e.target.value)} required/></label>}<label>{t.email}<div className="input-icon"><Mail size={16}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div></label><label>{t.password}<div className="input-icon"><LockKeyhole size={16}/><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label><button className="btn-primary auth-submit" disabled={loading}>{loading?"...":mode==="login"?t.login:t.signup}<ArrowUpRight size={16}/></button></form><div className="auth-switch">{mode==="login"?t.noAccount:t.already}<button onClick={()=>setMode(mode==="login"?"signup":"login")}>{mode==="login"?t.signup:t.login}</button></div>{!isSupabaseConfigured&&<div className="demo-notice"><Sparkles size={15}/>{t.demo}</div>}</motion.div></motion.div>;
}
function PageHeading({eyebrow,title,desc}) {return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>}
function Empty({text}) {return <div className="empty-state"><Sparkles size={25}/><p>{text}</p></div>}

export default App;
