import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Appointments() {
    const { appointments, company, settings = {} } = usePage().props;

    const pageTitle = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? `المواعيد - ${settings.platform_name.trim()}`
        : 'المواعيد - Dr. VET PLUS';

    return (
        <ClinicLayout activePage="appointments">
            <Head title={pageTitle} />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">المواعيد</h1>
                    <p className="text-sm text-slate-500 mt-1">إدارة مواعيد الحجوزات لـ {company.name}</p>
                </div>
                <Link href="/clinic/appointments/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all">
                    ➕ موعد جديد
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {appointments && appointments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">العميل / الحيوان</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الطبيب</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">الفرع</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">متى</th>
                                    <th className="py-4 px-6 font-bold text-slate-600 uppercase tracking-wider text-xs">نوع وتفاصيل</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {appointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-900">{app.client_name}</div>
                                            <div className="text-[10px] text-slate-500">{app.pet_name}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-slate-700">{app.doctor_name || 'غير محدد'}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs text-slate-500">{app.branch_name || 'الفرع الرئيسي'}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-slate-800">{new Date(app.date).toLocaleDateString('ar-SA')}</div>
                                            <div className="text-[11px] text-sky-600 font-bold">{app.time}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded ml-2">{app.type}</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${app.status === 'scheduled' ? 'bg-sky-50 text-sky-700' :
                                                    app.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                                                        'bg-red-50 text-red-700'
                                                }`}>
                                                {app.status === 'scheduled' ? 'مجدول' : app.status === 'completed' ? 'مكتمل' : 'ملغي'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            📅
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-2">لا توجد مواعيد</h2>
                        <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                            لم يتم إضافة أي مواعيد حتى الآن.
                        </p>
                    </div>
                )}
            </div>
        </ClinicLayout>
    );
}
