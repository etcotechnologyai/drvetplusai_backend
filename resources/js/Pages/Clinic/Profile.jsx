import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Profile() {
    const { company, account, licenses, owner, settings = {} } = usePage().props;

    const pageTitle = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? `بيانات المنشأة - ${settings.platform_name.trim()}`
        : 'بيانات المنشأة - Dr. VET PLUS';

    return (
        <ClinicLayout activePage="profile">
            <Head title={pageTitle} />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">بيانات المنشأة</h1>
                <p className="text-sm text-slate-500 mt-1">عرض وتعديل معلومات منشأتك البيطرية</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Company Info */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Main Info Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-l from-sky-500 to-cyan-500 px-6 py-4">
                            <h2 className="text-white font-extrabold text-lg flex items-center gap-2">
                                🏥 معلومات المنشأة
                            </h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoField label="اسم المنشأة" value={company.name} />
                                <InfoField label="الاسم القانوني" value={company.legal_name || 'غير محدد'} />
                                <InfoField label="رقم السجل التجاري" value={company.registration_number || 'غير محدد'} />
                                <InfoField label="تاريخ التسجيل" value={company.created_at ? new Date(company.created_at).toLocaleDateString('ar-SA') : 'غير محدد'} />
                            </div>

                            {/* Services */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-3">الخدمات المتاحة</label>
                                <div className="flex flex-wrap gap-3">
                                    <ServiceBadge active={company.has_medical_services} label="خدمات طبية" icon="🩺" />
                                    <ServiceBadge active={company.has_pharmacy} label="صيدلية" icon="💊" />
                                    <ServiceBadge active={company.has_lab} label="مختبر" icon="🔬" />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-500">حالة المنشأة:</span>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${company.is_active
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${company.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                    {company.is_active ? 'نشطة' : 'غير نشطة'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Licenses */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-l from-violet-500 to-purple-500 px-6 py-4">
                            <h2 className="text-white font-extrabold text-lg flex items-center gap-2">
                                📄 التراخيص والمستندات
                            </h2>
                        </div>
                        <div className="p-6">
                            {licenses && licenses.length > 0 ? (
                                <div className="space-y-4">
                                    {licenses.map((lic) => (
                                        <div key={lic.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                                            <div>
                                                <span className="text-sm font-bold text-slate-800 block">
                                                    {lic.type === 'commercial' ? '📋 سجل تجاري' :
                                                        lic.type === 'medical' ? '🏥 ترخيص طبي' : `📄 ${lic.type}`}
                                                </span>
                                                <span className="text-xs text-slate-500 mt-0.5 block">رقم: {lic.number}</span>
                                                {lic.expires_at && (
                                                    <span className="text-xs text-slate-400 block mt-0.5">
                                                        ينتهي: {new Date(lic.expires_at).toLocaleDateString('ar-SA')}
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${lic.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                                }`}>
                                                {lic.status === 'active' ? 'ساري' : lic.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-3">📄</div>
                                    <p className="text-sm text-slate-500 font-semibold">لا توجد تراخيص مسجلة</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Owner Sidebar */}
                <div className="space-y-6">
                    {/* Owner Info */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-l from-sky-600 to-sky-500 px-6 py-4">
                            <h2 className="text-white font-extrabold text-lg flex items-center gap-2">
                                👤 مالك المنشأة
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
                                    {(owner.full_name || 'م').substring(0, 2)}
                                </div>
                                <div>
                                    <span className="text-base font-extrabold text-slate-900 block">{owner.full_name}</span>
                                    <span className="text-xs text-sky-600 font-bold">مدير المنشأة</span>
                                </div>
                            </div>
                            <InfoFieldSmall label="البريد الإلكتروني" value={owner.email || 'غير محدد'} />
                            <InfoFieldSmall label="رقم الجوال" value={owner.phone || 'غير محدد'} />
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-l from-slate-600 to-slate-500 px-6 py-4">
                            <h2 className="text-white font-extrabold text-lg flex items-center gap-2">
                                🔑 معلومات الحساب
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <InfoFieldSmall label="اسم الحساب" value={account.name} />
                            <InfoFieldSmall label="نوع الحساب" value={account.type === 'company' ? 'منشأة / عيادة' : account.type} />
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-500">حالة الحساب:</span>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${account.is_active
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-red-50 text-red-700'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${account.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                    {account.is_active ? 'نشط' : 'غير نشط'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClinicLayout>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">{label}</label>
            <p className="text-sm font-semibold text-slate-800 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">{value}</p>
        </div>
    );
}

function InfoFieldSmall({ label, value }) {
    return (
        <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">{label}</label>
            <p className="text-sm font-bold text-slate-800">{value}</p>
        </div>
    );
}

function ServiceBadge({ active, label, icon }) {
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${active
            ? 'bg-sky-50 text-sky-700 border-sky-200'
            : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
            }`}>
            {icon} {label}
        </span>
    );
}
