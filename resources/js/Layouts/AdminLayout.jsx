import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, activePage = 'dashboard' }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Premium SVG Icons for SaaS Look
    const icons = {
        dashboard: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
        providers: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13h-6v6h6v-6zm-8-4H5v6h6V9zm8-4h-6v6h6V5zM11 5H5v3h6V5z" />
            </svg>
        ),
        companies: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        doctors: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
        petOwners: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        pets: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        consultations: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        appointments: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        payments: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
        plans: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        reports: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
        { id: 'dashboard', label: 'نظرة عامة', href: '/admin/dashboard', icon: icons.dashboard },
        { id: 'providers', label: 'طلبات مقدمي الخدمة', href: '/admin/providers', icon: icons.providers },
        { id: 'companies', label: 'العيادات والمنشآت', href: '/admin/companies', icon: icons.companies },
        { id: 'doctors', label: 'الأطباء البيطريون', href: '/admin/doctors', icon: icons.doctors },
        { id: 'pet-owners', label: 'أصحاب الحيوانات', href: '/admin/pet-owners', icon: icons.petOwners },
        { id: 'pets', label: 'الحيوانات الأليفة', href: '/admin/pets', icon: icons.pets },
        { id: 'consultations', label: 'الاستشارات', href: '/admin/consultations', icon: icons.consultations },
        { id: 'appointments', label: 'المواعيد والحجوزات', href: '/admin/appointments', icon: icons.appointments },
        { id: 'payments', label: 'المدفوعات والمحافظ', href: '/admin/payments', icon: icons.payments },
        { id: 'plans', label: 'الباقات والاشتراكات', href: '/admin/plans', icon: icons.plans },
        { id: 'reports', label: 'التقارير الإحصائية', href: '/admin/reports', icon: icons.reports },
        { id: 'settings', label: 'إعدادات المنصة', href: '/admin/settings', icon: icons.settings },
    ];

    const getBreadcrumbLabel = () => {
        const item = sidebarItems.find(i => i.id === activePage);
        return item ? item.label : 'الرئيسية';
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-row-reverse" dir="rtl">
            
            {/* Sidebar Desktop */}
            <aside className={`bg-slate-900 text-slate-200 hidden lg:flex lg:flex-col shadow-xl fixed top-0 bottom-0 right-0 z-20 border-l border-slate-800 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
                <div className="flex items-center justify-between px-5 h-20 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-emerald-550 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-emerald-500/20 bg-gradient-to-tr from-emerald-600 to-teal-500">
                            🩺
                        </div>
                        {!collapsed && (
                            <div className="transition-opacity duration-300">
                                <span className="text-base font-extrabold text-white block whitespace-nowrap">بوابة الإدارة</span>
                                <span className="text-[10px] text-slate-400 font-bold tracking-wider block">Dr. VET PLUS</span>
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
                    >
                        {collapsed ? '◀' : '▶'}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3.5 py-6 space-y-1.5 custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = activePage === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center rounded-xl text-sm font-semibold transition-all duration-200 group ${
                                    collapsed ? 'justify-center p-3' : 'gap-3.5 px-4 py-3'
                                } ${
                                    isActive
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-650 text-white shadow-md shadow-emerald-650/10'
                                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                                }`}
                            >
                                <span className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'}`}>
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
                <div className="p-4 border-t border-slate-800 bg-slate-950/60">
                    <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-extrabold text-sm shadow-inner">
                            {(auth?.user?.full_name || 'مدير').substring(0, 2)}
                        </div>
                        {!collapsed && (
                            <div className="truncate flex-1 transition-opacity duration-300">
                                <span className="text-sm font-bold text-white block truncate leading-tight">{auth?.user?.full_name || 'مدير النظام'}</span>
                                <span className="text-[10px] text-emerald-450 font-bold block mt-0.5">مشرف SaaS الرئيسي</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar overlay & drawer */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-30" onClick={() => setSidebarOpen(false)} />
            )}
            
            <aside className={`w-72 bg-slate-900 text-slate-200 flex flex-col shadow-2xl fixed top-0 bottom-0 right-0 z-40 transition-transform duration-300 transform lg:hidden ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex items-center justify-between px-6 h-20 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg font-bold">
                            🩺
                        </div>
                        <span className="text-base font-extrabold text-white">Dr. VET PLUS</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white text-xl font-bold p-1">
                        ✕
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
                    {sidebarItems.map((item) => {
                        const isActive = activePage === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    isActive
                                        ? 'bg-emerald-600 text-white shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
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
                            <Link href="/admin/dashboard" className="hover:text-emerald-600 font-semibold transition-colors">الرئيسية</Link>
                            <span className="text-slate-300">/</span>
                            <span className="font-extrabold text-slate-800">{getBreadcrumbLabel()}</span>
                        </div>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-5 mr-auto">
                        
                        {/* Search Bar */}
                        <div className="relative hidden md:block w-72">
                            <span className="absolute inset-y-0 right-3 flex.5 flex items-center text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="بحث عن منشأة، طبيب، أو مربي..."
                                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pr-9 pl-4 py-2 text-xs focus:bg-white transition-all outline-none text-slate-700 placeholder-slate-400"
                            />
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button 
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-all text-slate-600 hover:text-slate-800 relative outline-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {auth?.notifications?.length > 0 && (
                                    <span className="absolute -top-1 -left-1 min-w-[18px] h-4.5 bg-amber-500 text-[9px] text-white font-extrabold flex items-center justify-center rounded-full px-1 ring-2 ring-white">
                                        {auth.notifications.length}
                                    </span>
                                )}
                            </button>

                            {notificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)} />
                                    <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-3 transform origin-top-left transition-all text-right">
                                        <div className="px-4 pb-2 border-b border-slate-150 flex justify-between items-center">
                                            <span className="text-xs font-extrabold text-slate-800">الإشعارات والتنبيهات</span>
                                            {auth?.notifications?.length > 0 && (
                                                <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">
                                                    {auth.notifications.length} تنبيه نشط
                                                </span>
                                            )}
                                        </div>
                                        <div className="max-h-80 overflow-y-auto mt-2">
                                            {auth?.notifications && auth.notifications.length > 0 ? (
                                                auth.notifications.map((notif) => (
                                                    <Link
                                                        key={notif.id}
                                                        href={notif.url || '#'}
                                                        onClick={() => setNotificationsOpen(false)}
                                                        className="flex flex-col gap-1 px-4 py-3 hover:bg-slate-50 border-b border-slate-50/50 last:border-b-0 transition-colors"
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                {notif.title}
                                                            </span>
                                                            <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">{notif.created_at}</span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                                            {notif.body}
                                                        </p>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <span className="text-2xl block mb-1">🔔</span>
                                                    <span className="text-xs text-slate-450 font-bold">لا توجد إشعارات جديدة</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1 px-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all outline-none"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                                    {(auth?.user?.full_name || 'مدير').substring(0, 2)}
                                </div>
                                <div className="text-right hidden md:block">
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 block leading-tight">{auth?.user?.full_name || 'مدير النظام'}</span>
                                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">مدير النظام</span>
                                </div>
                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 transform origin-top-left transition-all">
                                        <Link
                                            href="/admin/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                            إعدادات المنصة
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
                    <p>© {new Date().getFullYear()} Dr. VET PLUS. لوحة الإدارة والتحكم الشاملة. جميع الحقوق محفوظة.</p>
                </footer>
            </div>

        </div>
    );
}
