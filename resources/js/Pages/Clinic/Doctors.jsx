import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Doctors() {
    const { doctors, company, settings = {} } = usePage().props;

    const pageTitle = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? `الأطباء - ${settings.platform_name.trim()}`
        : 'الأطباء - Dr. VET PLUS';

    return (
        <ClinicLayout activePage="doctors">
            <Head title={pageTitle} />

            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">طاقم الأطباء</h1>
                    <p className="text-sm text-slate-500 mt-1">إدارة الأطباء الممارسين في {company.name}</p>
                </div>
                <Link href="/clinic/doctors/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-500/20 hover:opacity-90 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    تعيين طبيب جديد
                </Link>
            </div>

            {/* Doctors List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {doctors && doctors.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الطبيب</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الفرع</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">التخصص والدور</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الحالة</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {doctors.map((doc) => (
                                    <tr key={doc.assignment_id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-100 to-sky-50 text-sky-600 flex items-center justify-center font-extrabold shadow-inner border border-sky-100">
                                                    {(doc.full_name || 'ط').substring(0, 1)}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-extrabold text-slate-900 block">{doc.full_name}</span>
                                                    <span className="text-[10px] text-slate-500 font-bold block mt-0.5">{doc.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                                {doc.branch_name || 'عام / جميع الفروع'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-slate-800 block mb-0.5">
                                                {doc.specialty || 'الطب البيطري العام'}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-bold">
                                                {doc.assignment_role === 'owner' ? 'المالك' : 'طبيب ممارس'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${doc.is_active
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                <span className={`w-1 h-1 rounded-full ${doc.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                {doc.is_active ? 'نشط' : 'غير نشط'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all opacity-50 cursor-not-allowed">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-50 cursor-not-allowed">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            👨‍⚕️
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-2">لا يوجد أطباء معينين</h2>
                        <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                            لم تقم بتعيين أي أطباء لمباشرة العمل في الفروع حتى الآن.
                        </p>
                    </div>
                )}
            </div>
        </ClinicLayout>
    );
}
