import React, { useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const { settings = {} } = usePage().props || {};

    // Guard: platform_name must be a plain string
    const pageTitle =
        typeof settings?.platform_name === 'string' && settings.platform_name.trim()
            ? settings.platform_name.trim()
            : 'Dr. VET PLUS';

    const [faqOpen, setFaqOpen] = useState({});

    const toggleFaq = (index) => {
        setFaqOpen(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const user = auth?.user ?? null;

    return (
        <>
            <Head title={`${pageTitle} - استشارة بيطرية أونلاين لحيوانك الأليف`} />

            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white" dir="rtl">

                {/* 1. Header Section */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                {settings?.platform_logo ? (
                                    <img src={settings.platform_logo} alt={pageTitle} className="h-10 w-auto object-contain" />
                                ) : (
                                    <>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-2xl font-bold bg-gradient-to-l from-emerald-700 to-blue-700 bg-clip-text text-transparent">{pageTitle}</span>
                                    </>
                                )}
                            </div>

                            {/* Nav Links - Desktop */}
                            <nav className="hidden md:flex items-center gap-8">
                                <a href="#home" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">الرئيسية</a>
                                <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">كيف نعمل</a>
                                <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">الخدمات</a>
                                <a href="#providers" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">للأطباء والعيادات</a>
                                <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">الأسئلة الشائعة</a>
                            </nav>

                            {/* CTAs */}
                            <div className="flex items-center gap-4">
                                {user ? (
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold text-sm shadow-md shadow-emerald-500/10 hover:shadow-lg transition-all duration-200"
                                    >
                                        لوحة التحكم ({user.full_name || user.name})
                                    </Link>
                                ) : (
                                    <>
                                        {/*<Link
                                            href="/login"
                                            className="text-sm font-bold text-slate-700 hover:text-emerald-600 px-4 py-2 transition-colors"
                                        >
                                            تسجيل الدخول
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-950 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                                        >
                                            إنشاء حساب
                                        </Link>*/}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. Hero Section */}
                <section id="home" className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
                    <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl -z-10 translate-y-1/3"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                            {/* Hero Text */}
                            <div className="lg:col-span-7 text-center lg:text-right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-6">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    رعاية بيطرية فورية متكاملة لحيوانك الأليف
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                                    استشارة بيطرية أونلاين <br />
                                    <span className="bg-gradient-to-l from-emerald-600 to-blue-600 bg-clip-text text-transparent">لحيوانك في أي وقت</span>
                                </h1>
                                <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    تواصل مع أطباء بيطريين معتمدين، احجز استشارة فورية أو مجدولة بالصوت والصورة، وتابع السجل الطبي لحيوانك الأليف من مكان واحد وبأمان تام.
                                </p>

                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                    <Link
                                        href="/register"
                                        className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        احجز استشارة الآن
                                    </Link>
                                    <Link
                                        href="/register/provider"
                                        className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500 font-bold text-lg transition-all duration-300"
                                    >
                                        انضم كمقدم خدمة (طبيب/عيادة)
                                    </Link>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                                    <div>
                                        <div className="text-3xl font-extrabold text-slate-950">98%</div>
                                        <div className="text-sm text-slate-500 mt-1">نسبة رضا العملاء</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-extrabold text-slate-950">+150</div>
                                        <div className="text-sm text-slate-500 mt-1">طبيب بيطري مرخص</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-extrabold text-slate-950">+10k</div>
                                        <div className="text-sm text-slate-500 mt-1">حيوان تم علاجه</div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Illustration */}
                            <div className="lg:col-span-5 flex justify-center items-center relative">
                                <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-gradient-to-tr from-emerald-100 to-blue-50 border border-white shadow-2xl flex items-center justify-center p-6">
                                    {/* Visual Backdrop decoration */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-emerald-300 animate-[spin_60s_linear_infinite] opacity-50 m-2"></div>

                                    {/* Floating Cards */}
                                    <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">🩺</div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800">استشارة نشطة</div>
                                            <div className="text-[10px] text-slate-500">د. أحمد خالد</div>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">📋</div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800">وصفة طبية معتمدة</div>
                                            <div className="text-[10px] text-slate-500">جاهزة للتحميل</div>
                                        </div>
                                    </div>

                                    {/* Medical cross/icon design inside hero wrapper */}
                                    <div className="text-center">
                                        <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-white text-5xl mx-auto shadow-lg shadow-emerald-500/30 animate-pulse">
                                            🐾
                                        </div>
                                        <h3 className="mt-6 text-xl font-bold text-slate-900">{pageTitle}</h3>
                                        <p className="text-sm text-slate-500 mt-2 max-w-[200px]">استشارات فورية بلمسة زر عبر الويب والهاتف</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 3. How it Works */}
                <section id="how-it-works" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">كيف تعمل منصة {pageTitle}؟</h2>
                            <p className="mt-4 text-lg text-slate-600">أربع خطوات بسيطة تفصلك عن الحصول على أفضل رعاية لحيوانك الأليف</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 relative">
                            {/* Decorative line */}
                            <div className="hidden md:block absolute top-1/3 left-1/8 right-1/8 h-0.5 bg-slate-100 -z-0"></div>

                            {[
                                { step: "1", title: "اختر نوع حيوانك الأليف", desc: "حدد نوع الحيوان (أليف، طيور، مواشي، خيول) لنقدم لك الأخصائي المناسب له.", icon: "🐱" },
                                { step: "2", title: "اختر الطبيب أو العيادة", desc: "استعرض الأطباء المتواجدين حالياً، وقارن تقييماتهم وخبراتهم الطويلة.", icon: "👨‍⚕️" },
                                { step: "3", title: "ابدأ استشارتك المرئية", desc: "تواصل مع الطبيب بالصوت والصورة، واعرض عليه حالة حيوانك الأليف فوراً.", icon: "💬" },
                                { step: "4", title: "استلم خطة العلاج والوصفة", desc: "احصل على تقرير تشخيصي متكامل مع وصفة طبية موثقة ومعتمدة.", icon: "📄" },
                            ].map((item, index) => (
                                <div key={index} className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200/80 shadow-sm text-2xl flex items-center justify-center mx-auto mb-6">
                                        {item.icon}
                                    </div>
                                    <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 bg-slate-200/40 w-6 h-6 rounded-full flex items-center justify-center">
                                        {item.step}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Services Section */}
                <section id="services" className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">ميزات فريدة</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mt-2">كل ما تحتاجه لرعاية صحة حيوانك</h2>
                            <p className="mt-4 text-lg text-slate-600">خدمات متكاملة وحلول ذكية تدعمك وتدعم حيوانك الأليف في أي مكان</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {[
                                { title: "استشارة فورية", desc: "تواصل مع طبيب متاح فوراً للحالات الطارئة والسريعة التي لا تحتمل التأجيل.", icon: "🚨" },
                                { title: "استشارة مجدولة", desc: "احجز موعداً في وقت لاحق يناسبك مع طبيب بيطري متخصص في سلوكيات أو أمراض محددة.", icon: "📅" },
                                { title: "وصفات طبية معتمدة", desc: "وصفات معتمدة إلكترونياً وصالحة للصرف من الصيدليات البيطرية المعتمدة.", icon: "💊" },
                                { title: "سجل طبي ذكي", desc: "سجل صحي رقمي يوثق استشارات حيوانك، تشخيصاته، ونتائجه الطبية لسهولة المتابعة.", icon: "🗂️" },
                                { title: "تنبيهات وتطعيمات", desc: "نظام إشعارات يذكرك بمواعيد التطعيمات الدورية والفحوصات القادمة لحيوانك الأليف.", icon: "💉" },
                                { title: "دليل العيادات والمراكز", desc: "ابحث عن أقرب العيادات البيطرية الموثقة حولك، واستعرض أوقات عملها وخدماتها.", icon: "🏥" },
                            ].map((service, index) => (
                                <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-2xl flex items-center justify-center mb-6">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. For Doctors & Clinics */}
                <section id="providers" className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-800/40 via-transparent to-transparent"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                            {/* Description for providers */}
                            <div className="lg:col-span-7">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-bold mb-4 border border-emerald-700">
                                    للأطباء البيطريين وأصحاب العيادات
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                                    وسّع نطاق عملك وقدّم خدماتك <br />
                                    <span className="text-emerald-400">لآلاف العملاء في منطقتك</span>
                                </h2>
                                <p className="mt-6 text-emerald-100 text-base sm:text-lg leading-relaxed max-w-xl">
                                    انضم إلى أكبر منصة رقمية بيطرية في الشرق الأوسط. احصل على نظام إلكتروني متكامل لإدارة العيادة والمواعيد، واقبل الاستشارات الطبية بالفيديو أينما كنت.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {[
                                        "جدولة مرنة واستقبال حجوزات الاستشارات الطبية بيسر وسهولة.",
                                        "ملف مهني بيطري موثق يبرز خبراتك، تخصصك وتقييمات عملائك.",
                                        "إدارة متطورة للفروع، الموظفين، والتراخيص الطبية الخاصة بعيادتك.",
                                        "تقارير دورية وإحصائيات لقياس أداء ونمو أرباح عيادتك الطبية."
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-emerald-800 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                                            <p className="text-sm sm:text-base text-emerald-100">{benefit}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10">
                                    <Link
                                        href="/register/provider"
                                        className="inline-block px-8 py-4 rounded-2xl bg-white text-emerald-950 font-bold hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                                    >
                                        سجّل كشريك ومقدم خدمة الآن
                                    </Link>
                                </div>
                            </div>

                            {/* visual placeholder or layout card for clinic features */}
                            <div className="lg:col-span-5">
                                <div className="bg-emerald-900/60 border border-emerald-800 rounded-3xl p-8 backdrop-blur-md">
                                    <h4 className="font-bold text-lg border-b border-emerald-800 pb-4 mb-4 text-emerald-200">التحكم في العيادة والمواعيد</h4>
                                    <div className="space-y-4">
                                        <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">🐱</div>
                                                <div>
                                                    <p className="font-semibold text-slate-200">استشارة هرة أليفة</p>
                                                    <p className="text-xs text-emerald-400">ساره علي</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-semibold">10:30 ص</span>
                                        </div>

                                        <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">🐕</div>
                                                <div>
                                                    <p className="font-semibold text-slate-200">استشارة كلب جيرمن</p>
                                                    <p className="text-xs text-emerald-400">محمد فهد</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-semibold">01:00 م</span>
                                        </div>

                                        <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center">🦜</div>
                                                <div>
                                                    <p className="font-semibold text-slate-200">فحص سلوك طائر</p>
                                                    <p className="text-xs text-emerald-400">خالد عبدالله</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-semibold">03:30 م</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 6. Value & Trust Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Graphic visual side */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                                        <div className="text-3xl mb-3">🛡️</div>
                                        <h4 className="font-bold text-slate-900">أمان وحماية</h4>
                                        <p className="text-xs text-slate-500 mt-2">بيانات استشاراتك الطبية مشفرة ومحمية تماماً.</p>
                                    </div>
                                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
                                        <div className="text-3xl mb-3">🌍</div>
                                        <h4 className="font-bold text-slate-900">أطباء بكل مكان</h4>
                                        <p className="text-xs text-slate-500 mt-2">استشارات عابرة للحدود مع نخبة الخبراء.</p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                                        <div className="text-3xl mb-3">🤝</div>
                                        <h4 className="font-bold text-slate-900">دعم متواصل</h4>
                                        <p className="text-xs text-slate-500 mt-2">فريق دعم عربي متاح لمساعدتك على مدار الساعة.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                                        <div className="text-3xl mb-3">🐾</div>
                                        <h4 className="font-bold text-slate-900">سجل صحي</h4>
                                        <p className="text-xs text-slate-500 mt-2">حفظ تاريخ العلاجات لمساعدة طبيبك القادم.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Text side */}
                            <div>
                                <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">لماذا تختارنا؟</span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mt-2">نوفر لحيوانك الأليف الرعاية الطبية التي يستحقها</h2>
                                <p className="mt-6 text-slate-600 leading-relaxed">
                                    نهتم في {pageTitle} بتقديم تجربة صحية فريدة. لا داعي لنقل حيوانك الأليف وهو مريض أو متألم وتكبد عناء الذهاب للعيادات، يمكنك الآن تشخيص حالته الطارئة والحصول على نصيحة طبية موثقة في بضع دقائق.
                                </p>
                                <div className="mt-8 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">✓</div>
                                        <div>
                                            <h5 className="font-bold text-slate-900">أطباء بيطريون معتمدون ومرخصون</h5>
                                            <p className="text-sm text-slate-500 mt-1">نحن ندقق بدقة في جميع رخص الأطباء ونضمن تسجيل المختصين والمهنيين فقط.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">✓</div>
                                        <div>
                                            <h5 className="font-bold text-slate-900">مرونة وسهولة الاستخدام</h5>
                                            <p className="text-sm text-slate-500 mt-1">واجهة استخدام واضحة ومبسطة بالكامل لتناسب الجميع دون أي تعقيد.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 7. FAQ Section */}
                <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-slate-950">الأسئلة الشائعة حول المنصة</h2>
                            <p className="mt-4 text-slate-600">إجابات سريعة للأسئلة التي تتبادر إلى ذهنك بشكل متكرر</p>
                        </div>

                        <div className="mt-12 space-y-4">
                            {[
                                { q: "هل الاستشارة البيطرية أونلاين بديل كامل للعيادة التقليدية؟", a: "تعتبر الاستشارة أونلاين حلاً مثالياً للحالات البسيطة، الاستفسارات السريعة، المتابعة الطبية، والتوجيه الطارئ. ولكن في الحالات التي تتطلب تدخلات جراحية، أو أشعة، أو تحاليل مخبرية، سيقوم الطبيب بتوجيهك للذهاب إلى أقرب عيادة بيطرية مسجلة بالمنصة." },
                                { q: `كيف يتم التحقق من موثوقية الأطباء في ${pageTitle}؟`, a: "نقوم بطلب ومراجعة التراخيص الطبية، الهويات الوطنية، وشهادات مزاولة المهنة المعتمدة لكل طبيب قبل تفعيل حسابه وموافقته كطبيب معتمد في المنصة." },
                                { q: "هل يمكنني إلغاء موعد الاستشارة أو تعديله؟", a: "نعم، يمكنك إلغاء الموعد أو تعديله بكل يسر وسهولة من لوحة التحكم الخاصة بحسابك، شريطة أن يتم ذلك قبل الموعد بمدة لا تقل عن 3 ساعات للحصول على استرداد كامل." },
                                { q: "ما هي الأجهزة التي يمكنني استخدامها للبدء بالاستشارة؟", a: "المنصة متوافقة تماماً وتعمل على جميع الهواتف الذكية، الأجهزة اللوحية، وأجهزة الحاسوب الشخصي من خلال المتصفح مباشرة دون الحاجة لتحميل تطبيقات إضافية." }
                            ].map((faq, index) => {
                                const isOpen = !!faqOpen[index];
                                return (
                                    <div key={index} className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300">
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="w-full text-right p-6 font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                                        >
                                            <span>{faq.q}</span>
                                            <span className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                                        </button>
                                        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'}`}>
                                            <p className="p-6 text-sm text-slate-600 leading-relaxed bg-slate-50/40">{faq.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 8. Footer Section */}
                <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">

                            {/* Logo & Intro */}
                            <div className="md:col-span-1">
                                <div className="flex items-center gap-2 text-white">
                                    {settings?.platform_logo ? (
                                        <img src={settings.platform_logo} alt={pageTitle} className="h-8 w-auto object-contain" />
                                    ) : (
                                        <>
                                            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                                                <span className="text-white text-base">🐾</span>
                                            </div>
                                            <span className="text-xl font-bold tracking-wider">{pageTitle}</span>
                                        </>
                                    )}
                                </div>
                                <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    المنصة الرائدة لربط مربي الحيوانات بأفضل العيادات والأطباء البيطريين لتقديم استشارات رقمية موثوقة وآمنة تماماً.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-white font-bold text-sm mb-4">المنصة</h4>
                                <ul className="space-y-2 text-xs sm:text-sm">
                                    <li><a href="#home" className="hover:text-white transition-colors">الرئيسية</a></li>
                                    <li><a href="#how-it-works" className="hover:text-white transition-colors">كيف نعمل</a></li>
                                    <li><a href="#services" className="hover:text-white transition-colors">الخدمات والميزات</a></li>
                                    <li><a href="#faq" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                                </ul>
                            </div>

                            {/* Legal Links */}
                            <div>
                                <h4 className="text-white font-bold text-sm mb-4">للشركاء</h4>
                                <ul className="space-y-2 text-xs sm:text-sm">
                                    <li><Link href="/register/provider" className="hover:text-white transition-colors">انضم كطبيب بيطري</Link></li>
                                    <li><Link href="/register/provider" className="hover:text-white transition-colors">انضم كعيادة بيطرية</Link></li>
                                    <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام الطبية</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">شروط تقديم الخدمة</a></li>
                                </ul>
                            </div>

                            {/* Newsletter / Contact */}
                            <div>
                                <h4 className="text-white font-bold text-sm mb-4">تواصل معنا</h4>
                                <p className="text-xs sm:text-sm leading-relaxed mb-4">لديك أي استفسارات أو تود الانضمام لشركائنا؟</p>
                                <a href="mailto:support@drvet.sa" className="text-xs sm:text-sm text-emerald-400 font-bold hover:underline">support@drvet.sa</a>
                            </div>

                        </div>

                        {/* Copyright */}
                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                            <p>© {new Date().getFullYear()} {pageTitle}. جميع الحقوق محفوظة.</p>
                            <p>صنع بكل حب لرعاية حيواناتكم 💚</p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
