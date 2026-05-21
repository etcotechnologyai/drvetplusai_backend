import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ClinicLayout({ children, activePage = 'dashboard' }) {
    const { auth = { user: null }, settings = {} } = usePage().props || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const platformName = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? settings.platform_name.trim()
        : 'Dr. VET PLUS';

    const icons = {
        dashboard: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
        profile: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        branches: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        doctors: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        appointments: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        consultations: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        settings: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'نظرة عامة', href: '/clinic/dashboard', icon: icons.dashboard },
        { id: 'profile', label: 'بيانات المنشأة', href: '/clinic/profile', icon: icons.profile },
        { id: 'branches', label: 'الفروع', href: '/clinic/branches', icon: icons.branches },
        { id: 'doctors', label: 'الأطباء', href: '/clinic/doctors', icon: icons.doctors },
        { id: 'appointments', label: 'المواعيد', href: '/clinic/appointments', icon: icons.appointments },
        { id: 'consultations', label: 'الاستشارات', href: '/clinic/consultations', icon: icons.consultations },
        { id: 'settings', label: 'الإعدادات', href: '/clinic/settings', icon: icons.settings },
    ];

    const getBreadcrumbLabel = () => {
        const item = sidebarItems.find(i => i.id === activePage);
        return item ? item.label : 'الرئيسية';
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-row-reverse" dir="rtl">

            {/* Sidebar Desktop */}
            <aside className={`bg-gradient-to-b from-sky-900 via-sky-950 to-slate-950 text-slate-200 hidden lg:flex lg:flex-col shadow-xl fixed top-0 bottom-0 right-0 z-20 border-l border-sky-800/30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
                <div className="flex items-center justify-between px-5 h-20 bg-sky-950/80 border-b border-sky-800/40">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-sky-500/20">
                            🏥
                        </div>
                        {!collapsed && (
                            <div className="transition-opacity duration-300">
                                <span className="text-base font-extrabold text-white block whitespace-nowrap">لوحة تحكم العيادة</span>
                                <span className="text-[10px] text-sky-300/70 font-bold tracking-wider block">{platformName}</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-sky-800/50 text-sky-300 hover:text-white transition-colors"
                        title={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
                    >
                        {collapsed ? '◀' : '▶'}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3.5 py-6 space-y-1.5 custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = activePage === item.id;
                        if (item.disabled) {
                            return (
                                <div
                                    key={item.id}
                                    title={collapsed ? item.label : 'قريباً...'}
                                    className={`flex items-center rounded-xl text-sm font-semibold opacity-40 cursor-not-allowed ${collapsed ? 'justify-center p-3' : 'gap-3.5 px-4 py-3'} text-slate-500`}
                                >
                                    <span className="text-slate-600">{item.icon}</span>
                                    {!collapsed && <span className="flex-1">{item.label}</span>}
                                    {!collapsed && <span className="text-[9px] bg-sky-800/30 text-sky-300 px-2 py-0.5 rounded-full">قريباً</span>}
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center rounded-xl text-sm font-semibold transition-all duration-200 group ${collapsed ? 'justify-center p-3' : 'gap-3.5 px-4 py-3'
                                    } ${isActive
                                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20'
                                        : 'text-slate-400 hover:bg-sky-800/30 hover:text-white'
                                    }`}
                            >
                                <span className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-sky-400'}`}>
                                    {item.icon}
                                </span>
                                {!collapsed && <span className="flex-1 transition-opacity duration-300">{item.label}</span>}
                                {!collapsed && isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-sky-800/40 bg-sky-950/60">
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-sky-800/50 border border-sky-700/50 text-white flex items-center justify-center font-extrabold text-sm shadow-inner">
                            {(auth?.user?.full_name || 'م').substring(0, 2)}
                        </div>
                        {!collapsed && (
                            <div className="truncate flex-1 transition-opacity duration-300">
                                <span className="text-sm font-bold text-white block truncate leading-tight">{auth?.user?.full_name || 'مالك المنشأة'}</span>
                                <span className="text-[10px] text-sky-400 font-bold block mt-0.5">مدير العيادة</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar overlay & drawer */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-30" onClick={() => setSidebarOpen(false)} />
            )}

            <aside className={`w-72 bg-gradient-to-b from-sky-900 via-sky-950 to-slate-950 text-slate-200 flex flex-col shadow-2xl fixed top-0 bottom-0 right-0 z-40 transition-transform duration-300 transform lg:hidden ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 h-20 bg-sky-950/80 border-b border-sky-800/40">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white text-lg font-bold">
                            🏥
                        </div>
                        <span className="text-base font-extrabold text-white">لوحة تحكم العيادة</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold p-1">
                        ✕
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
                    {sidebarItems.map((item) => {
                        const isActive = activePage === item.id;
                        if (item.disabled) {
                            return (
                                <div key={item.id} className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold opacity-40 cursor-not-allowed text-slate-500">
                                    <span className="text-slate-600">{item.icon}</span>
                                    <span className="flex-1">{item.label}</span>
                                    <span className="text-[9px] bg-sky-800/30 text-sky-300 px-2 py-0.5 rounded-full">قريباً</span>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-sky-800/30 hover:text-white'
                                    }`}
                            >
                                <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                                <span className="flex-1">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen overflow-x-hidden transition-all duration-300 ${collapsed ? 'lg:mr-20' : 'lg:mr-72'}`}>

                {/* Topbar */}
                <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10 px-6 sm:px-10 h-20 flex justify-between items-center">
                    {/* Toggle Button Mobile */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Breadcrumbs */}
                    <div className="hidden sm:flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                            <Link href="/clinic/dashboard" className="hover:text-sky-600 font-semibold transition-colors">لوحة التحكم</Link>
                            <span className="text-slate-300">/</span>
                            <span className="font-extrabold text-slate-800">{getBreadcrumbLabel()}</span>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-5 mr-auto">
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1 px-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all outline-none"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                                    {(auth?.user?.full_name || 'م').substring(0, 2)}
                                </div>
                                <div className="text-right hidden md:block">
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 block leading-tight">{auth?.user?.full_name || 'مالك المنشأة'}</span>
                                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">مدير العيادة</span>
                                </div>
                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 transform origin-top-left transition-all">
                                        <Link
                                            href="/clinic/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            بيانات المنشأة
                                        </Link>
                                        <hr className="border-slate-100 my-1.5" />
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full text-right flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                                        >
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            تسجيل الخروج
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Content Container */}
                <main className="flex-grow p-6 sm:p-10 max-w-[1600px] w-full mx-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-auto">
                    <p>© {new Date().getFullYear()} {platformName}. لوحة تحكم العيادة. جميع الحقوق محفوظة.</p>
                </footer>
            </div>
        </div>
    );
}
