import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Branches() {
    const { branches, company, settings = {} } = usePage().props;

    const pageTitle = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? `الفروع - ${settings.platform_name.trim()}`
        : 'الفروع - Dr. VET PLUS';

    return (
        <ClinicLayout activePage="branches">
            <Head title={pageTitle} />

            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">إدارة الفروع</h1>
                    <p className="text-sm text-slate-500 mt-1">عرض قائمة الفروع التابعة لـ {company.name}</p>
                </div>
                <Link href="/clinic/branches/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 hover:opacity-90 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    إضافة فرع جديد
                </Link>
            </div>

            {/* Branches List */}
            {branches && branches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((branch) => (
                        <div key={branch.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                            <div className={`h-2 ${branch.is_main ? 'bg-sky-500' : 'bg-slate-200'}`}></div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl">
                                        📍
                                    </div>
                                    {branch.is_main && (
                                        <span className="text-[10px] bg-sky-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                            الفرع الرئيسي
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-extrabold text-slate-900 mb-1">{branch.name}</h3>
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                        <span className={`w-2 h-2 rounded-full ${branch.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                        {branch.is_active ? 'نشط' : 'غير نشط'}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {branch.has_pharmacy && (
                                            <span className="text-[10px] bg-violet-50 text-violet-700 px-2 py-1 rounded-lg border border-violet-100 font-bold">💊 صيدلية</span>
                                        )}
                                        {branch.has_lab && (
                                            <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-100 font-bold">🔬 مختبر</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-bold italic">
                                        أنشئ في: {new Date(branch.created_at).toLocaleDateString('ar-SA')}
                                    </span>
                                    <button className="text-sky-600 text-xs font-bold hover:underline opacity-50 cursor-not-allowed">
                                        التفاصيل
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        📍
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">لا توجد فروع مسجلة</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
                        لم تقم بإضافة أي فروع لمنشأتك حتى الآن. يمكنك مستقبلاً إضافة فروع متعددة وإدارة أطباء كل فرع بشكل مستقل.
                    </p>
                </div>
            )}
        </ClinicLayout>
    );
}
