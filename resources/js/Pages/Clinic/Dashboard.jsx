import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ClinicLayout from '@/Layouts/ClinicLayout';

export default function Dashboard() {
    const {
        company,
        stats,
        activeConsultations,
        todaysAppointments,
        doctorsStatus,
        alerts,
        approvalStatus,
        settings = {}
    } = usePage().props;

    const pageTitle = typeof settings?.platform_name === 'string' && settings.platform_name.trim()
        ? `لوحة التشغيل - ${settings.platform_name.trim()}`
        : 'لوحة التشغيل - Dr. VET PLUS';

    const kpiCards = [
        { label: 'مواعيد اليوم', value: stats.appointments, icon: '📅', gradient: 'from-amber-500 to-orange-400' },
        { label: 'الاستشارات النشطة', value: stats.consultations, icon: '💬', gradient: 'from-emerald-500 to-teal-400' },
        { label: 'الأطباء المتاحون', value: stats.doctors, icon: '👨‍⚕️', gradient: 'from-violet-500 to-purple-400' },
        { label: 'الفروع', value: stats.branches, icon: '📍', gradient: 'from-sky-500 to-cyan-400' },
        { label: 'الإيرادات اليوم', value: `${stats.revenue} ر.س`, icon: '💰', gradient: 'from-emerald-600 to-emerald-500' },
        { label: 'طلبات بانتظار الإجراء', value: stats.pendingRequests, icon: '⏱️', gradient: 'from-rose-500 to-red-400' },
    ];

    const currentStatus = approvalStatus === 'approved'
        ? { label: 'معتمد ونشط', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' }
        : { label: 'قيد المراجعة', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };

    return (
        <ClinicLayout activePage="dashboard">
            <Head title={pageTitle} />

            {/* Header & Quick Actions */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            لوحة التشغيل اليومية
                        </h1>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${currentStatus.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot} animate-pulse`}></span>
                            {currentStatus.label}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">إدارة العمليات للعيادة ({company.name}) بيوم {new Date().toLocaleDateString('ar-SA')}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link href="/clinic/appointments/create" className="btn-quick-action bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300">
                        ➕ إضافة موعد
                    </Link>
                    <Link href="/clinic/doctors/create" className="btn-quick-action bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300">
                        👨‍⚕️ إضافة طبيب
                    </Link>
                    <Link href="/clinic/consultations" className="btn-quick-action bg-sky-600 text-white hover:bg-sky-700 border border-transparent shadow-sm shadow-sky-600/20">
                        💬 فتح الاستشارات
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {kpiCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${card.gradient}`}></div>
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-2xl">{card.icon}</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 mb-1">{card.label}</p>
                        <p className="text-xl font-extrabold text-slate-900">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Tables) - Takes 2/3 */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Appointments Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                                📅 مواعيد اليوم
                            </h2>
                            <Link href="/clinic/appointments" className="text-xs font-bold text-sky-600 hover:text-sky-700">عرض الكل</Link>
                        </div>
                        <div className="p-0">
                            {todaysAppointments && todaysAppointments.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-right">
                                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase">
                                            <tr>
                                                <th className="px-5 py-3">العميل / الحيوان</th>
                                                <th className="px-5 py-3">الطبيب</th>
                                                <th className="px-5 py-3">الوقت</th>
                                                <th className="px-5 py-3">الحالة</th>
                                                <th className="px-5 py-3 text-center">إجراء</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {todaysAppointments.map(app => (
                                                <tr key={app.id} className="hover:bg-slate-50/50">
                                                    <td className="px-5 py-3">
                                                        <div className="font-bold text-slate-900">{app.client_name}</div>
                                                        <div className="text-[10px] text-slate-500">{app.pet_name}</div>
                                                    </td>
                                                    <td className="px-5 py-3 text-xs font-semibold">{app.doctor_name}</td>
                                                    <td className="px-5 py-3 text-xs">{app.time}</td>
                                                    <td className="px-5 py-3">
                                                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-sky-50 text-sky-700">{app.status}</span>
                                                    </td>
                                                    <td className="px-5 py-3 text-center">
                                                        <button className="text-xs font-bold text-slate-600 hover:text-sky-600 border border-slate-200 rounded px-2 py-1 hover:border-sky-300 bg-white">عرض</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12 px-4">
                                    <div className="text-4xl mb-3">📭</div>
                                    <h3 className="text-sm font-bold text-slate-800 mb-1">لا توجد مواعيد لليوم</h3>
                                    <p className="text-xs text-slate-500">لم يتم حجز أي مواعيد لهذا اليوم حتى الآن.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Consultations */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                                💬 الاستشارات النشطة (الآن)
                            </h2>
                            <Link href="/clinic/consultations" className="text-xs font-bold text-sky-600 hover:text-sky-700">الذهاب للاستشارات</Link>
                        </div>
                        <div className="p-0">
                            {activeConsultations && activeConsultations.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-right">
                                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase">
                                            <tr>
                                                <th className="px-5 py-3">الاستشارة</th>
                                                <th className="px-5 py-3">الطبيب المعالج</th>
                                                <th className="px-5 py-3">العميل</th>
                                                <th className="px-5 py-3 text-center">إجراء</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {activeConsultations.map(c => (
                                                <tr key={c.id} className="hover:bg-slate-50/50">
                                                    <td className="px-5 py-3">
                                                        <div className="font-bold text-slate-900"># {c.id} - {c.service_name || 'استشارة'}</div>
                                                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                            {c.status === 'active' ? 'نشطة الآن' : 'بانتظار الرد'}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3 text-xs font-semibold text-slate-700">{c.doctor_name || 'غير محدد'}</td>
                                                    <td className="px-5 py-3 text-xs text-slate-600">{c.client_name} ({c.pet_name})</td>
                                                    <td className="px-5 py-3 text-center">
                                                        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded px-3 py-1 hover:bg-emerald-50 bg-white">متابعة</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-10 px-4">
                                    <div className="text-3xl mb-2 text-slate-300">💬</div>
                                    <h3 className="text-sm font-bold text-slate-600 mb-1">لا توجد استشارات نشطة</h3>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column (Widgets) - Takes 1/3 */}
                <div className="space-y-6">

                    {/* Doctors Status Widget */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex">
                            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                👨‍⚕️ حالة الطاقم الطبي
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {doctorsStatus && doctorsStatus.length > 0 ? (
                                doctorsStatus.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200">
                                                {(doc.full_name || 'ط').substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-xs text-slate-900">{doc.full_name}</div>
                                                <div className="text-[10px] text-slate-500">طبيب بيطري</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${doc.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {doc.is_active ? 'متاح للعمل' : 'غير متاح'}
                                            </span>
                                            <div className="text-[10px] font-semibold text-slate-400 mt-1">تواجده اليوم: -</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-xs text-slate-500 font-semibold mb-2">لا يوجد أطباء معينين</p>
                                    <Link href="/clinic/doctors" className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-bold text-slate-600 hover:bg-slate-50">إضافة طبيب</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Operational Alerts Widget */}
                    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden mb-6 relative">
                        <div className="absolute top-0 right-0 w-1 h-full bg-red-400"></div>
                        <div className="px-5 py-4 border-b border-red-50 bg-red-50/30">
                            <h2 className="text-sm font-extrabold text-red-900 flex items-center gap-2">
                                🚨 تنبيهات تشغيلية
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {alerts && alerts.expiringLicenses && alerts.expiringLicenses.length > 0 ? (
                                alerts.expiringLicenses.map(lic => (
                                    <div key={lic.id} className="flex gap-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
                                        <div className="text-red-500 shrink-0">📄</div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 leading-tight">تغلق صلاحية الترخيص: {lic.type}</p>
                                            <p className="text-[10px] font-semibold text-red-600 mt-1">ينتهي خلال {lic.days_left} يوم ({new Date(lic.expires_at).toLocaleDateString('ar-SA')})</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                    <div className="text-emerald-500 shrink-0">✅</div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800 leading-tight">لا توجد تنبيهات تخص التراخيص</p>
                                        <p className="text-[10px] font-semibold text-emerald-600 mt-1">جميع مستندات المنشأة سارية المفعول.</p>
                                    </div>
                                </div>
                            )}

                            {(!alerts.pendingLabResults || alerts.pendingLabResults.length === 0) && (
                                <div className="flex items-center justify-between p-2 border-b border-slate-50 last:border-0 pb-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                        🔬 نتائج مختبر معلقة
                                    </div>
                                    <span className="text-xs text-slate-400">0</span>
                                </div>
                            )}

                            {(!alerts.incompletePrescriptions || alerts.incompletePrescriptions.length === 0) && (
                                <div className="flex items-center justify-between p-2 border-slate-50 pb-1">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                        💊 وصفات قيد الصرف
                                    </div>
                                    <span className="text-xs text-slate-400">0</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .btn-quick-action {
                    @apply px-4 py-2 text-xs font-bold rounded-xl transition-all;
                }
            `}</style>
        </ClinicLayout>
    );
}
