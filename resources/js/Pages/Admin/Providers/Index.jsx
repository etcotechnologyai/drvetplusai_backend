import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ providers, filters, counts }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const applyFilters = (newStatus = statusFilter, newSearch = search) => {
        router.get(
            '/admin/providers',
            {
                search: newSearch,
                status: newStatus === 'all' ? '' : newStatus,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            applyFilters(statusFilter, search);
        }
    };

    const handleSearchClear = () => {
        setSearch('');
        applyFilters(statusFilter, '');
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        applyFilters(status, search);
    };

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

    const providersList = providers.data || [];

    return (
        <AdminLayout activePage="providers">
            <Head title="طلبات مقدمي الخدمة - Dr. VET PLUS" />

            {/* Header Details */}
            <div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">طلبات التقديم والتنشيط</h2>
                    <p className="text-slate-500 text-sm mt-1.5 font-medium">مراجعة وثائق وتراخيص العيادات والأطباء البيطريين للموافقة على انضمامهم للمنصة.</p>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start">
                    <button
                        onClick={() => handleStatusChange('all')}
                        className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                            statusFilter === 'all'
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        الكل ({counts.all})
                    </button>
                    <button
                        onClick={() => handleStatusChange('pending')}
                        className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                            statusFilter === 'pending'
                                ? 'bg-amber-500 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        بانتظار المراجعة ({counts.pending})
                    </button>
                    <button
                        onClick={() => handleStatusChange('active')}
                        className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                            statusFilter === 'active'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        معتمد ونشط ({counts.active})
                    </button>
                    <button
                        onClick={() => handleStatusChange('rejected')}
                        className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                            statusFilter === 'rejected'
                                ? 'bg-red-650 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        مرفوض ({counts.rejected})
                    </button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="البحث بالاسم، البريد، الجوال أو المنشأة..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pr-9 pl-10 py-2.5 text-xs focus:bg-white transition-all outline-none text-slate-700 placeholder-slate-400"
                    />
                    {search && (
                        <button
                            onClick={handleSearchClear}
                            className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                <button
                    onClick={() => applyFilters(statusFilter, search)}
                    className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                    تطبيق البحث
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {providersList.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl mb-4 text-slate-450">
                            📂
                        </div>
                        <h4 className="text-base font-extrabold text-slate-800">لا توجد طلبات في هذا القسم</h4>
                        <p className="text-slate-400 text-sm mt-1.5 font-medium">يرجى تغيير فلاتر البحث أو فلتر العرض لمشاهدة طلبات أخرى.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <th className="py-5 px-8">المفوض الرسمي</th>
                                    <th className="py-5 px-8">المنشأة البيطرية</th>
                                    <th className="py-5 px-8">نوع الكيان</th>
                                    <th className="py-5 px-8">المدينة</th>
                                    <th className="py-5 px-8">رقم الجوال</th>
                                    <th className="py-5 px-8">حالة الطلب</th>
                                    <th className="py-5 px-8">تاريخ التقديم</th>
                                    <th className="py-5 px-8 text-center">العمليات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {providersList.map((provider) => (
                                    <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4.5 px-8">
                                            <div className="font-extrabold text-slate-800">{provider.full_name}</div>
                                            <div className="text-slate-400 text-[10px] mt-0.5 font-mono">{provider.email}</div>
                                        </td>
                                        <td className="py-4.5 px-8 font-bold text-slate-700">
                                            {provider.entity_name}
                                        </td>
                                        <td className="py-4.5 px-8">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                                                provider.type === 'clinic'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                    : 'bg-blue-50 text-blue-700 border-blue-100'
                                            }`}>
                                                {provider.type === 'clinic' ? 'منشأة بيطرية' : 'طبيب بيطري مستقل'}
                                            </span>
                                        </td>
                                        <td className="py-4.5 px-8 font-semibold text-slate-500">
                                            {provider.city || 'غير محدد'}
                                        </td>
                                        <td className="py-4.5 px-8 font-mono text-slate-500" dir="ltr">
                                            {provider.phone}
                                        </td>
                                        <td className="py-4.5 px-8">
                                            {provider.status === 0 && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                    <span>معلق</span>
                                                </span>
                                            )}
                                            {provider.status === 1 && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    <span>معتمد</span>
                                                </span>
                                            )}
                                            {provider.status === 2 && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    <span>مرفوض</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4.5 px-8 text-xs text-slate-400 font-medium">
                                            {provider.created_at}
                                        </td>
                                        <td className="py-4.5 px-8">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/providers/${provider.id}`}
                                                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold rounded-xl text-xs transition-all"
                                                >
                                                    التفاصيل
                                                </Link>
                                                {provider.status === 0 && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(provider.id)}
                                                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                                                        >
                                                            اعتماد
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(provider.id)}
                                                            className="px-3.5 py-2 bg-red-650 hover:bg-red-750 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                                                        >
                                                            رفض
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {providers.links && providers.links.length > 3 && (
                <div className="mt-8 flex justify-between items-center bg-white px-6 py-4.5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400 font-bold">
                        عرض {providersList.length} من أصل {providers.total} طلب
                    </span>
                    <div className="flex items-center gap-1.5" dir="ltr">
                        {providers.links.map((link, i) => {
                            if (!link.url) {
                                return (
                                    <span 
                                        key={i} 
                                        className="px-3 py-1.5 rounded-xl border border-slate-100 text-slate-300 text-xs font-bold pointer-events-none"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    preserveState
                                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                                        link.active
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                            : 'border-slate-100 text-slate-650 hover:bg-slate-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
