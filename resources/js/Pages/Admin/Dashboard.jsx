import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats, recent_providers, recent_users, recent_companies, alerts }) {

    const handleApprove = (id) => {
        if (confirm('هل أنت متأكد من اعتماد مقدم الخدمة هذا؟')) {
            router.post(`/admin/providers/${id}/approve`);
        }
    };

    const handleReject = (id) => {
        if (confirm('هل أنت متأكد من رفض مقدم الخدمة هذا؟')) {
            router.post(`/admin/providers/${id}/reject`);
        }
    };

    const statCards = [
        {
            label: 'إجمالي المستخدمين',
            value: stats.total_users,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
            )
        },
        {
            label: 'مقدمي الخدمة',
            value: stats.total_providers,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13h-6v6h6v-6zm-8-4H5v6h6V9zm8-4h-6v6h6V5zM11 5H5v3h6V5z" />
                    </svg>
                </div>
            )
        },
        {
            label: 'طلبات بانتظار الاعتماد',
            value: stats.pending_approvals,
            bgClass: stats.pending_approvals > 0 ? 'bg-amber-50/50 border border-amber-200' : 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            isWarning: stats.pending_approvals > 0,
            icon: (
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stats.pending_approvals > 0 ? 'bg-amber-100 text-amber-700' : 'bg-amber-50 text-amber-650'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            )
        },
        {
            label: 'العيادات والمنشآت',
            value: stats.total_companies,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-655 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
            )
        },
        {
            label: 'الأطباء البيطريون',
            value: stats.total_doctors,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
            )
        },
        {
            label: 'الحيوانات الأليفة',
            value: stats.total_pets,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-650 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
            )
        },
        {
            label: 'الاستشارات الجارية',
            value: stats.total_consultations,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
            )
        },
        {
            label: 'المدفوعات المكتملة',
            value: stats.total_payments,
            bgClass: 'bg-white border border-slate-100',
            textClass: 'text-slate-800',
            icon: (
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-650 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
            )
        },
    ];

    return (
        <AdminLayout activePage="dashboard">
            <Head title="نظرة عامة - Dr. VET PLUS" />

            {/* Compact SaaS Banner */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-slate-900 text-white py-4.5 px-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit mb-1">
                        <span>🛡️</span>
                        <span>لوحة المدير</span>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">نظرة عامة على عمليات النظام</h1>
                    <p className="text-slate-400 text-xs mt-0.5 font-medium">إليك لمحة سريعة على البيانات المسجلة، طلبات التنشيط وحالة التشغيل اليوم.</p>
                </div>
                <div className="relative z-10 flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-bold backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-slate-350">الخادر:</span>
                    <span className="font-mono text-white">{new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Warnings list */}
            {alerts && alerts.length > 0 && (
                <div className="mb-8 space-y-3">
                    {alerts.map((alert, idx) => (
                        <div
                            key={idx}
                            className={`p-4.5 rounded-2xl border flex items-center justify-between gap-4 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                                alert.type === 'warning'
                                    ? 'bg-amber-50 border-amber-150 text-amber-900'
                                    : 'bg-emerald-50 border-emerald-150 text-emerald-950'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{alert.type === 'warning' ? '⚠️' : '💡'}</span>
                                <span>{alert.message}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{alert.date}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-sm mb-10">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-5">⚡ إجراءات الإدارة السريعة</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <Link
                        href="/admin/providers"
                        className="p-5 bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-100 hover:border-emerald-600 rounded-2xl transition-all duration-300 group flex items-center gap-4 hover:shadow-lg hover:shadow-emerald-600/10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-white/10 text-emerald-600 group-hover:text-white flex items-center justify-center text-xl transition-all">
                            📥
                        </div>
                        <div>
                            <span className="text-xs sm:text-sm font-extrabold block">مراجعة طلبات التقديم</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-emerald-200 block mt-0.5">تراخيص العيادات والأطباء</span>
                        </div>
                    </Link>

                    <Link
                        href="/admin/companies"
                        className="p-5 bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-100 hover:border-emerald-600 rounded-2xl transition-all duration-300 group flex items-center gap-4 hover:shadow-lg hover:shadow-emerald-600/10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-white/10 text-sky-655 group-hover:text-white flex items-center justify-center text-xl transition-all">
                            🏢
                        </div>
                        <div>
                            <span className="text-xs sm:text-sm font-extrabold block">إدارة المنشآت</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-emerald-200 block mt-0.5">العيادات والصيدليات</span>
                        </div>
                    </Link>

                    <Link
                        href="/admin/doctors"
                        className="p-5 bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-100 hover:border-emerald-600 rounded-2xl transition-all duration-300 group flex items-center gap-4 hover:shadow-lg hover:shadow-emerald-600/10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-white/10 text-emerald-600 group-hover:text-white flex items-center justify-center text-xl transition-all">
                            🩺
                        </div>
                        <div>
                            <span className="text-xs sm:text-sm font-extrabold block">الأطباء البيطريون</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-emerald-200 block mt-0.5">تنشيط وتعديل الحسابات</span>
                        </div>
                    </Link>

                    <Link
                        href="/admin/settings"
                        className="p-5 bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-100 hover:border-emerald-600 rounded-2xl transition-all duration-300 group flex items-center gap-4 hover:shadow-lg hover:shadow-emerald-600/10"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-white/10 text-amber-700 group-hover:text-white flex items-center justify-center text-xl transition-all">
                            ⚙️
                        </div>
                        <div>
                            <span className="text-xs sm:text-sm font-extrabold block">إعدادات المنصة</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-emerald-200 block mt-0.5">عمولات النظام والاشتراكات</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between h-36 ${card.bgClass}`}
                    >
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
                                <h3 className={`text-2.5xl font-extrabold tracking-tight ${card.textClass}`}>{card.value}</h3>
                            </div>
                            {card.icon}
                        </div>
                        <div className="w-full mt-2 flex items-center justify-between border-t border-slate-50 pt-2">
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                <span>↑ 12%</span>
                                <span className="text-slate-400 font-medium">نشاط متزايد</span>
                            </span>
                            <svg className="w-20 h-5 text-emerald-500/80 stroke-2 fill-none" viewBox="0 0 100 30">
                                <path d="M0,20 Q15,5 30,15 T60,5 T90,20" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Tables / Lists Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Pending Requests Data Grid */}
                <div className="xl:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-extrabold text-slate-800">طلبات انتظار المراجعة والاعتماد</h3>
                            <p className="text-xs text-slate-400 mt-1">آخر الطلبات المقدمة من المستشفيات والعيادات والأطباء</p>
                        </div>
                        <Link href="/admin/providers" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                            <span>شاشة الطلبات</span>
                            <span>←</span>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        {recent_providers.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-3 text-slate-450">
                                    📂
                                </div>
                                <h4 className="text-sm font-bold text-slate-700">لا توجد طلبات معلقة حالياً</h4>
                                <p className="text-xs text-slate-400 mt-1">تمت مراجعة جميع وثائق الموفرين بنجاح.</p>
                            </div>
                        ) : (
                            <table className="w-full text-right border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-450 font-bold uppercase tracking-wider text-[10px]">
                                        <th className="py-4 px-6">صاحب الحساب / المفوض</th>
                                        <th className="py-4 px-6">الكيان / المنشأة البيطرية</th>
                                        <th className="py-4 px-6">المدينة</th>
                                        <th className="py-4 px-6 text-center">أدوات الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recent_providers.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-extrabold text-slate-800">{p.full_name}</div>
                                                <div className="text-slate-400 text-[10px] mt-0.5 font-mono">{p.email}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-slate-700">{p.entity_name}</div>
                                                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold mt-1 ${p.type === 'clinic' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                                                    {p.type === 'clinic' ? 'منشأة بيطرية' : 'طبيب مستقل'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-slate-500">{p.city || 'غير محدد'}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/admin/providers/${p.id}`}
                                                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] transition-all"
                                                    >
                                                        تفاصيل
                                                    </Link>
                                                    <button
                                                        onClick={() => handleApprove(p.id)}
                                                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-all shadow-sm"
                                                    >
                                                        قبول
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(p.id)}
                                                        className="px-2.5 py-1.5 bg-red-650 hover:bg-red-700 text-white font-bold rounded-lg text-[10px] transition-all shadow-sm"
                                                    >
                                                        رفض
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Right Lists: Latest Users & Companies */}
                <div className="space-y-8">
                    
                    {/* Latest registered owners */}
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-800">أحدث المستخدمين</h3>
                                <span className="text-[10px] text-slate-400">آخر 5 أعضاء مسجلين بالمنصة</span>
                            </div>
                            <Link href="/admin/pet-owners" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                عرض الكل
                            </Link>
                        </div>
                        
                        <div className="space-y-3.5">
                            {recent_users.length === 0 ? (
                                <div className="py-8 text-center border border-dashed border-slate-150 rounded-2xl">
                                    <span className="text-xl block mb-1">👥</span>
                                    <span className="text-xs text-slate-400 font-bold">لا يوجد مستخدمون مسجلون حالياً</span>
                                </div>
                            ) : (
                                recent_users.map((u) => (
                                    <div 
                                        key={u.id} 
                                        onClick={() => {
                                            if (u.role === 'provider') {
                                                router.visit(`/admin/providers/${u.id}`);
                                            } else {
                                                router.visit(`/admin/pet-owners`);
                                            }
                                        }}
                                        className="flex justify-between items-center p-3 rounded-2xl border border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/5 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                                                {u.full_name.substring(0, 1)}
                                            </div>
                                            <div className="truncate max-w-[130px]">
                                                <span className="text-xs font-bold text-slate-850 block truncate">{u.full_name}</span>
                                                <span className="text-[10px] text-slate-400 block mt-0.5 truncate font-mono">{u.email}</span>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                            u.role === 'admin' ? 'bg-amber-100 text-amber-800' :
                                            u.role === 'provider' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                                        }`}>
                                            {u.role === 'admin' ? 'مدير' : u.role === 'provider' ? 'مقدم خدمة' : 'مربي'}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Latest clinics */}
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h3 className="text-sm sm:text-base font-extrabold text-slate-800">أحدث العيادات والمنشآت</h3>
                                <span className="text-[10px] text-slate-400">الكيانات المسجلة مؤخراً</span>
                            </div>
                            <Link href="/admin/companies" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                عرض الكل
                            </Link>
                        </div>
                        
                        <div className="space-y-3.5">
                            {recent_companies.length === 0 ? (
                                <div className="py-8 text-center border border-dashed border-slate-150 rounded-2xl">
                                    <span className="text-xl block mb-1">🏢</span>
                                    <span className="text-xs text-slate-400 font-bold">لا توجد منشآت مسجلة حالياً</span>
                                </div>
                            ) : (
                                recent_companies.map((c) => (
                                    <div 
                                        key={c.id} 
                                        onClick={() => {
                                            if (c.owner_id) {
                                                router.visit(`/admin/providers/${c.owner_id}`);
                                            } else {
                                                router.visit(`/admin/companies`);
                                            }
                                        }}
                                        className="flex justify-between items-center p-3 rounded-2xl border border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/5 cursor-pointer transition-all"
                                    >
                                        <div className="truncate max-w-[150px]">
                                            <span className="text-xs font-bold text-slate-800 block truncate">{c.name}</span>
                                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">المدينة: {c.city || 'غير محدد'}</span>
                                        </div>
                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold ${
                                            c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            <span className={`w-1 h-1 rounded-full ${c.is_active ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            <span>{c.is_active ? 'نشط' : 'معلق'}</span>
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}
